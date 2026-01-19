from django.urls import path
from .views import (
    CookieTokenRefreshView,
    cookie_consent_view,
    google_login,
    user_me_view,
    logout_view,
)

urlpatterns = (
    path("me/", user_me_view, name="user_me_view"),
    path("auth/login/", google_login, name="google_login"),
    path("token/refresh/", CookieTokenRefreshView.as_view(), name="token_refresh"),
    path("logout/", logout_view, name="logout_view"),
    path("cookie-consent/", cookie_consent_view, name="cookie_consent"),
)
