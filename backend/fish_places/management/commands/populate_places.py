from pathlib import Path
import json
from typing import TypedDict, Literal
from django.core.management.base import BaseCommand
from django.core.files import File
from django.contrib.auth import get_user_model
from fish_places.models import Place

class PlaceData(TypedDict):
    place: str
    bg_name: str
    description: str
    image_url: str
    longitude: float | str
    latitude: float | str
    region: Literal["varna", "burgas"]
    max_wind_speed: int
    bad_wind_directions: str

class Command(BaseCommand):
    help = 'Populating the DB with fish places'

    def handle(self, *args, **kwargs):
        User = get_user_model()
        first_superuser = User.objects.filter(is_superuser=True).first()
        # user friendly error if we didnt create the superuser yet
        if not first_superuser:
            raise Exception("Superuser doesn't exist. Please create one before populating the places. Run python manage.py createsuperuser")
        
        base_path = Path(__file__).resolve().parent.parent.parent / "fixtures"
        images_dir = base_path / "images"
        json_path = base_path / "places.json"

        data: list[PlaceData]
        with open(json_path, "r", encoding="utf8") as f:
            data = json.load(f)

        skipped, created = 0, 0
        for item in data:
            if Place.objects.filter(place=item["place"]).exists():
                self.stdout.write(self.style.WARNING(f'{item["place"]} place already exists. Skipping...'))
                skipped += 1
                continue

            image_path = images_dir / item['image_name']
            if not image_path.exists():
                self.stdout.write(self.style.ERROR(f"Image not found. Skipping {item['place']}"))
                skipped += 1
                continue

            with open(image_path, "rb") as img_file:
                # passing name=item['image_name'] helps to not throw suspicious error with path traversal issues
                django_file = File(img_file, name=item['image_name'])

                Place.objects.create(
                    place=item["place"],
                    bg_place_name=item['bg_name'],
                    description=item['description'],
                    image=django_file,
                    longitude=item['longitude'],
                    latitude=item['latitude'],
                    region=item['region'],
                    max_wind_speed=item['max_wind_speed'],
                    bad_wind_directions=item['bad_wind_directions'],
                    creator=first_superuser
                )

            created += 1
            self.stdout.write(self.style.SUCCESS(f'Successfully added {item["place"]} place to the table'))

        self.stdout.write(f"Created {created}, Skipped {skipped}")



