from django.db import models
from django.conf import settings

import os

from .utils import image_directory_distributor


class Seller(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False)
    contact = models.CharField(max_length=200, null=False, blank=False)

    def delete(self, *args, **kwargs):
        for img in self.images.all():
            img.delete()
        
        super().delete(*args, **kwargs)

    def __str__(self):
        return self.name


class ChepareImages(models.Model):
    CHEPARE_TYPES = (
        ("safrid", "safrid"),
        ("karagioz", "karagioz"),
        ("chernokop", "chernokop"),
        ("palamud", "palamud"),
    )

    seller = models.ForeignKey(Seller, on_delete=models.CASCADE, related_name="images")
    chepare_type = models.CharField(max_length=20, choices=CHEPARE_TYPES)
    image = models.ImageField(upload_to=image_directory_distributor)

    def delete(self, *args, **kwargs):
        if self.image:
            path = self.image.path

            self.image.delete(save=False)
            
            curr_dir = os.path.dirname(path)
            sellers_dir = os.path.join(settings.MEDIA_ROOT, 'sellers')
            while curr_dir != sellers_dir and curr_dir != settings.MEDIA_ROOT:
                try:
                    os.rmdir(curr_dir)
                    curr_dir = os.path.dirname(curr_dir)
                except (OSError, ValueError):
                    break
                    
        super().delete(*args, **kwargs)

    def __str__(self):
        return f"{self.seller.name} - {self.chepare_type}"
