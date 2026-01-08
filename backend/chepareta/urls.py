from django.urls import path

from .views import get_all_chepareta, CreateChepareta, get_seller_chepareta, delete_chepare_seller

urlpatterns = (
    path("", get_all_chepareta, name="get_all_chepareta"),
    path("create/", CreateChepareta.as_view(), name="create_chepareta"),
    path("details/<seller>/", get_seller_chepareta, name="create_chepareta"),
    path("delete/<int:pk>/", delete_chepare_seller, name="delete_chepare_seller")
)
