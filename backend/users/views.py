from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView

from users.utils import (
    get_or_create_user,
    get_tokens_from_google_with_code,
    get_user_info_data,
)
from .serializers import UserMeSerializer
from .backends import CustomAuthentication
from .utils import set_token_in_cookie

from django.contrib.auth import get_user_model
from django.conf import settings

from google.auth.exceptions import GoogleAuthError
import requests


UserModel = get_user_model()


class CookieTokenRefreshView(TokenRefreshView):
    # Sets new access and refresh tokens in cookies

    def post(self, request, *args, **kwargs):
        refresh_token_cookie_name = settings.SIMPLE_JWT.get("REFRESH_TOKEN_NAME")
        refresh_token = request.COOKIES.get(refresh_token_cookie_name)
        if refresh_token:
            request.data[refresh_token_cookie_name] = refresh_token

        response = super().post(request, *args, **kwargs)
        if response.status_code != 200:
            return response

        access_token_cookie_name = settings.SIMPLE_JWT.get("ACCESS_TOKEN_NAME")
        access_token_lifetime = settings.SIMPLE_JWT.get("ACCESS_TOKEN_LIFETIME")
        refresh_token_lifetime = settings.SIMPLE_JWT.get("REFRESH_TOKEN_LIFETIME")

        new_access_token = response.data.get(access_token_cookie_name)
        new_refresh_token = response.data.get(refresh_token_cookie_name)
        if new_access_token and new_refresh_token:
            response = set_token_in_cookie(
                response,
                access_token_cookie_name,
                new_access_token,
                int(access_token_lifetime.total_seconds()),
            )
            response = set_token_in_cookie(
                response,
                refresh_token_cookie_name,
                new_refresh_token,
                int(refresh_token_lifetime.total_seconds()),
            )

            # dont send tokens in the response, frontend doesnt need such information
            # we attach the tokens in httpOnly cookies
            del response.data[refresh_token_cookie_name]
            del response.data[access_token_cookie_name]

        return response


@api_view(["GET", "POST"])
def cookie_consent_view(request):
    if request.method == "GET":
        try:
            cookie_consent = int(request.COOKIES.get("cf", 0)) == 1
        except ValueError as ve:
            print(ve)
            cookie_consent = False

        has_user_decided = None if not request.COOKIES.get("cf") else cookie_consent
        return Response(
            {
                "consent": has_user_decided,
            },
            status=status.HTTP_200_OK,
        )

    if request.method == "POST":
        consent = request.data.get("consent", False) == True
        response = Response({"consent": consent}, status=status.HTTP_200_OK)

        cookie_value = 0 if not consent else 1
        one_year = 365 * 24 * 60 * 60
        response = set_token_in_cookie(response, "cf", cookie_value, one_year)

        return response


@api_view(["POST"])
def google_login(request):
    code = request.data.get("code")
    if not code:
        return Response(
            {"detail": "Authorization code is required."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        tokens = get_tokens_from_google_with_code(code)
        user_info = get_user_info_data(tokens.get("id_token"))
        user = get_or_create_user(user_info)

        serializer = UserMeSerializer(user)
        response = Response(serializer.data)

        refresh = RefreshToken.for_user(user)
        access_token_lifetime = settings.SIMPLE_JWT.get("ACCESS_TOKEN_LIFETIME")
        refresh_token_lifetime = settings.SIMPLE_JWT.get("REFRESH_TOKEN_LIFETIME")

        response = set_token_in_cookie(
            response,
            settings.SIMPLE_JWT.get("ACCESS_TOKEN_NAME"),
            str(refresh.access_token),
            int(access_token_lifetime.total_seconds()),
        )
        response = set_token_in_cookie(
            response,
            settings.SIMPLE_JWT.get("REFRESH_TOKEN_NAME"),
            str(refresh),
            int(refresh_token_lifetime.total_seconds()),
        )

        return response

    except requests.exceptions.RequestException:
        # connection errors, timeouts, and 4xx/5xx from the POST request
        return Response(
            {"detail": "Failed to connect to Google auth servers."},
            status=status.HTTP_502_BAD_GATEWAY,
        )
    except (ValueError, GoogleAuthError):
        # invalid/tampered/expired tokens during verification
        return Response(
            {"detail": "Invalid or expired token."}, status=status.HTTP_401_UNAUTHORIZED
        )
    except Exception:
        # unexpected issues
        return Response(
            {"detail": "An internal error occurred."},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
@authentication_classes([CustomAuthentication])
@permission_classes([IsAuthenticated])
def user_me_view(request):
    serializer = UserMeSerializer(request.user)
    return Response(serializer.data)


@api_view(["POST"])
def logout_view(request):
    refresh_token = request.COOKIES.get(settings.SIMPLE_JWT.get("REFRESH_TOKEN_NAME"))
    if refresh_token:
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
        except Exception:
            # do nothing on error. It should still delete the cookies
            pass

    response = Response(
        {"detail": "Successfully logged out"}, status=status.HTTP_200_OK
    )
    response = set_token_in_cookie(
        response, settings.SIMPLE_JWT.get("ACCESS_TOKEN_NAME"), "", 0
    )
    response = set_token_in_cookie(
        response, settings.SIMPLE_JWT.get("REFRESH_TOKEN_NAME"), "", 0
    )

    return response
