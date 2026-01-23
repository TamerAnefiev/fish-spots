from rest_framework_simplejwt.authentication import JWTAuthentication
from django.conf import settings


class CustomAuthentication(JWTAuthentication):
    def authenticate(self, request):
        access_token = request.COOKIES.get(settings.SIMPLE_JWT.get("ACCESS_TOKEN_NAME"))
        # let the permission classes decide if the user can do things
        if not access_token:
            return None

        # 1. run checks and validate the token
        # 2. if token is malformed or expired, we return 401
        # 3. if everything passes fine, we do another layer of checks with permission classes
        validated_token = self.get_validated_token(access_token)
        return self.get_user(validated_token), validated_token
