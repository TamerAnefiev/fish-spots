from rest_framework import serializers

from .models import Seller, ChepareImages


class ChepareImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChepareImages
        fields = ["seller", "chepare_type", "image"]


class SellerSerializer(serializers.ModelSerializer):
    images = ChepareImagesSerializer(many=True, read_only=True)

    class Meta:
        model = Seller
        fields = ["name", "contact", "images", "id"]


class CreateSellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seller
        fields = ["name", "contact"]
