from django.urls import path

from .views import (
    catch_stats,
    get_oldest_catch_year,
    delete_catch_history,
    create_catch_history,
)

urlpatterns = (
    path("", catch_stats, name="catch_stats"),
    path("oldest-catch-year/", get_oldest_catch_year, name="oldest_catch_year"),
    path("create/", create_catch_history, name="create_catch_history"),
    path("delete/<int:pk>/", delete_catch_history, name="delete_catch_history"),
)
