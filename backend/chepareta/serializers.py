from rest_framework import serializers
import os

from .models import Seller, ChepareImages

ALLOWED_IMAGE_SIZE_MB = 1
ALLOWED_IMAGE_SIZE = ALLOWED_IMAGE_SIZE_MB * 1024 * 1024
ALLOWED_IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"]


class ChepareImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChepareImages
        fields = ["seller", "chepare_type", "image"]
        extra_kwargs = {
            "seller": {"write_only": True}
        }

    def validate_image(self, value):
        if value.size > ALLOWED_IMAGE_SIZE:
            raise serializers.ValidationError(f"Снимката '{value.name}' е твърде голяма. Макс. {ALLOWED_IMAGE_SIZE_MB}MB.")
        
        extension = os.path.splitext(value.name)[1].lower()
        if extension not in ALLOWED_IMAGE_EXTENSIONS:
            raise serializers.ValidationError(f"Невалиден формат. Позволени са: {', '.join(ALLOWED_IMAGE_EXTENSIONS)}")
        
        return value


class SellerSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()
    images_count = serializers.SerializerMethodField()
    thumbnail = serializers.SerializerMethodField()

    class Meta:
        model = Seller
        fields = ["id", "name", "contact", "images", "thumbnail", "images_count"]

    def get_thumbnail(self, obj):
        # try getting safrid thumbnail
        thumbnail = obj.images.filter(chepare_type="safrid").first()
        if not thumbnail:
            # fallback to whatever first image there is
            thumbnail = obj.images.first()

        request = self.context.get('request')
        return request.build_absolute_uri(thumbnail.image.url) if request else thumbnail.image.url

    def get_images_count(self, obj):
        return obj.images.all().count()

    def get_images(self, obj):
        all_images = obj.images.all()
        
        grouped_data = {}
        for img in all_images:
            img_type = img.chepare_type
            request = self.context.get('request')
            image_url = request.build_absolute_uri(img.image.url) if request else img.image.url
            
            if img_type not in grouped_data:
                grouped_data[img_type] = []
            
            grouped_data[img_type].append(image_url)
            
        return grouped_data


class CreateSellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seller
        fields = ["name", "contact"]
