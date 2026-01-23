from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import DestroyAPIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import api_view
from django.db.models import Count

from users.backends import CustomAuthentication
from users.permissions import IsSuperUser

from .models import Place
from .serializers import PlaceSerializer, CreatePlaceSerializer
from .utils import decide_to_show_spot
from fish_regions.views import WeatherDataView
from fish_regions import settings as region_settings
from fish_places.models import Place


class PlacesView(APIView):

    def get(self, request, *args, **kwargs):
        region = request.GET.get("region", "").lower()

        if not region:
            return Response(
                {"message": "Invalid region. You must provide `region` parameter."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        region_places = Place.objects.filter(region=region)
        serializer = PlaceSerializer(
            region_places, context={"request": request}, many=True
        )

        return Response(serializer.data, status=status.HTTP_200_OK)


class CreatePlaceView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    authentication_classes = [CustomAuthentication]
    permission_classes = [IsSuperUser]

    def post(self, request, *args, **kwargs):
        serializer = CreatePlaceSerializer(
            data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeletePlaceView(DestroyAPIView):
    queryset = Place.objects.all()
    authentication_classes = [CustomAuthentication]
    permission_classes = [IsSuperUser]


class SuggestedSpots(APIView):

    def get(self, request, *args, **kwargs):
        weather_response = WeatherDataView().get(request)

        if weather_response.status_code == 400:
            return Response(weather_response.data, status=status.HTTP_400_BAD_REQUEST)

        good_for_fish_spots = []
        for region, data in weather_response.data.items():
            today_weather = data.get("today", {}).get("list_hours", [])
            fish_areas_in_region = Place.objects.filter(fish_area_in_region=region)

            for fish_spot in fish_areas_in_region:
                if decide_to_show_spot(today_weather, fish_spot):
                    good_for_fish_spots.append(fish_spot)

        serializer = PlaceSerializer(
            good_for_fish_spots, context={"request": request}, many=True
        )
        return Response(serializer.data, status=status.HTTP_200_OK)


class PlaceDetailsView(APIView):

    def get(self, request, region, place_name, *args, **kwargs):
        if region not in region_settings.regions:
            return Response(
                {
                    "message": f"Valid regions are {list(region_settings.regions.keys())}."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        place = Place.objects.filter(
            region__iexact=region, place__iexact=place_name
        ).first()
        if not place:
            return Response(
                {"message": f"{place_name} does not exist."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = PlaceSerializer(instance=place, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
def get_number_of_region_places(request):
    results = Place.objects.values("region").annotate(count=Count("id"))

    regions_data = [
        {
            "region": item["region"],
            "regionBgName": region_settings.region_map.get(
                item["region"].lower(), item["region"]
            ),
            "count": item["count"],
        }
        for item in results
    ]
    total_places = sum(item["count"] for item in results)

    return Response({"total": total_places, "regions": regions_data})
