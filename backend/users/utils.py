from django.conf import settings
from django.contrib.auth import get_user_model

import requests
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests


UserModel = get_user_model()


def get_tokens_from_google_with_code(code: str):
    token_response = requests.post(
        "https://oauth2.googleapis.com/token",
        data={
            "code": code,
            "client_id": settings.GOOGLE_CLIENT_ID,
            "client_secret": settings.GOOGLE_CLIENT_SECRET,
            "redirect_uri": "postmessage",
            "grant_type": "authorization_code",
        },
        timeout=5,
    )
    # raise an error if Google returns 4xx or 5xx
    token_response.raise_for_status()
    return token_response.json()


def get_user_info_data(id_token_jwt: str):
    # https://developers.google.com/identity/openid-connect/openid-connect#obtainuserinfo
    user_info = id_token.verify_oauth2_token(
        id_token_jwt, google_requests.Request(), settings.GOOGLE_CLIENT_ID
    )

    # google guarantees that sub will always be in the user_info
    google_id = user_info["sub"]
    email = user_info.get("email")
    first_name = user_info.get("given_name")
    last_name = user_info.get("family_name")
    full_name = user_info.get("name")
    picture_url = user_info.get("picture")
    if not first_name and full_name:
        full_name = full_name.split(" ", 1)
        first_name = full_name[0]
        if not last_name and len(full_name) > 1:
            last_name = full_name[1]

    return {
        "google_id": google_id,
        "email": email,
        "first_name": first_name,
        "last_name": last_name,
        "picture_url": picture_url,
    }


def get_or_create_user(user_info):
    google_id = user_info.get("google_id")
    email = user_info.get("email")
    first_name = user_info.get("first_name")
    last_name = user_info.get("last_name")
    picture_url = user_info.get("picture_url")

    # try looking by google_id first. This is for users that didn't have previous accounts.
    user = UserModel.objects.filter(google_id=google_id).first()
    if not user:
        # lookup for existing legacy users that have email that matches their google login email
        user = UserModel.objects.filter(email=email).first()
        if user:
            user.google_id = google_id
            if not user.first_name:
                user.first_name = first_name
            if not user.last_name:
                user.last_name = last_name
            if not user.picture:
                user.picture = picture_url
            user.save()
        else:
            user = UserModel.objects.create(
                google_id=google_id,
                email=email,
                username=email,
                first_name=first_name,
                last_name=last_name,
                picture=picture_url,
            )
            user.save()

    if picture_url and user.picture != picture_url:
        user.picture = picture_url
        user.save(update_fields=["picture"])

    return user


def set_token_in_cookie(
    response,
    key: str,
    value: str,
    max_age: int,
    secure=True,
    httponly=True,
    samesite="Lax",
):
    response.set_cookie(
        key, value, max_age=max_age, secure=secure, httponly=httponly, samesite=samesite
    )

    return response
