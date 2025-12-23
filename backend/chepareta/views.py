from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser

from base.mixins import AuthorizedMixin

from .serializers import (
    SellerSerializer,
    CreateSellerSerializer,
    ChepareImagesSerializer,
)
from .models import Seller


@api_view(["GET"])
def get_all_chepareta(request):
    if request.method == "GET":
        sellers = Seller.objects.all()
        serializer = SellerSerializer(sellers, many=True, context={"request": request})
        return Response(serializer.data)


@api_view(["GET"])
def get_seller_chepareta(request, seller):
    if request.method == "GET":
        seller = seller.replace("-", " ")
        seller = Seller.objects.filter(name__iexact=seller).first()
        if not seller:
            return Response({"msg": "not found."}, status=400)

        serializer = SellerSerializer(seller, context={"request": request})
        return Response(serializer.data)


class CreateChepareta(AuthorizedMixin, APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        if not request.user.is_superuser:
            return Response({"detail": "Unauthorized."}, status=401)

        seller_serializer = CreateSellerSerializer(
            data={
                "name": request.data.get("name"),
                "contact": request.data.get("contact"),
            }
        )
        request.data.pop("name")
        request.data.pop("contact")
        if seller_serializer.is_valid():
            seller = seller_serializer.save()

            chepare_types, images = request.data.getlist(
                "chepareType"
            ), request.data.getlist("image")

            images_data = [
                {"chepare_type": ch_type, "image": image, "seller": seller.pk}
                for ch_type, image in zip(chepare_types, images)
            ]

            image_serializer = ChepareImagesSerializer(data=images_data, many=True)
            if image_serializer.is_valid():
                image_serializer.save()
                seller_data = SellerSerializer(seller, context={"request": request})
                return Response(seller_data.data, status=201)
            else:
                seller.delete()  # Rollback seller creation if image creation fails
                return Response(image_serializer.errors, status=400)

        return Response(seller_serializer.errors, status=400)
