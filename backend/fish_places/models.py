from django.db import models
from django.contrib.auth import get_user_model


UserModel = get_user_model()


class Place(models.Model):

    place = models.CharField(max_length=50)
    bg_place_name = models.CharField(max_length=50)
    description = models.TextField()
    image = models.ImageField(
        max_length=255,
        upload_to="fishing_spot_images/",
        null=False,
        blank=False,
    )
    longitude = models.CharField(max_length=30)
    latitude = models.CharField(max_length=30)
    region = models.CharField(max_length=30)
    # this is needed for the suggested spots algorithm. It maps to the weather place region.
    # For example: tyulenovo place uses shabla fish_area_in_region because we take the weather from shabla
    fish_area_in_region = models.CharField(max_length=50)
    max_wind_speed = models.IntegerField()
    bad_wind_directions = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    creator = models.ForeignKey(
        UserModel, on_delete=models.CASCADE, null=False, blank=False
    )

    def get_absolute_url(self):
        return f"{self.region}/{self.place.lower()}"

    def delete(self, *args, **kwargs):
        if self.image:
            self.image.delete(save=False)

        super().delete(*args, **kwargs)

    def __str__(self):
        return self.bg_place_name

    class Meta:
        ordering = ("-created_at",)
