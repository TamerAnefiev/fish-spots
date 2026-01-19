from django.urls import path
from .views import (
    UserExistsView,
    cookie_consent_view,
    google_login
)

urlpatterns = (
    path("user-exists/", UserExistsView.as_view(), name="user_exists"),
    path("auth/login/", google_login, name="google_login"),
    path("cookie-consent/", cookie_consent_view, name="cookie_consent"),
)
