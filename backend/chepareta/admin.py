from django.contrib import admin
from chepareta.models import Seller, ChepareImages


@admin.register(Seller)
class CustomSellerAdmin(admin.ModelAdmin):
    list_display = ("get_seller", "contact")

    @admin.display(description="Seller Name")
    def get_seller(self, seller: Seller):
        return str(seller)


@admin.register(ChepareImages)
class CustomChepareImagesAdmin(admin.ModelAdmin):
    list_display = ("get_seller", "chepare_type", "image")

    @admin.display(description="Seller Name")
    def get_seller(self, obj: ChepareImages):
        return str(obj.seller)
