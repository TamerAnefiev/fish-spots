from django.db import models
from django.utils.text import slugify
from django.conf import settings

import os

from .utils import image_directory_distributor


class Seller(models.Model):
    first_name = models.CharField(max_length=30, null=False, blank=False)
    last_name = models.CharField(max_length=30, null=False, blank=False)
    contact = models.CharField(max_length=15, null=False, blank=False)
    slug = models.SlugField(max_length=100, unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            if not self.pk:
                super().save(*args, **kwargs)
                
            self.slug = slugify(f"{self.first_name}-{self.last_name}-{self.pk}")
            super().save(update_fields=["slug"])
            return
        
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        for img in self.images.all():
            img.delete()
        
        super().delete(*args, **kwargs)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


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
        return f"{self.seller.first_name} - {self.chepare_type}"
