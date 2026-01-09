from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404
from django.db import transaction

from base.mixins import AuthorizedMixin
from users.backends import CustomAuthentication
from users.permissions import IsSuperUser

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


@api_view(["DELETE"])
@authentication_classes([CustomAuthentication])
@permission_classes([IsSuperUser])
def delete_chepare_seller(request, pk):
    seller = get_object_or_404(Seller, pk=pk)

    seller_name = seller.name
    images_count = seller.images.count()

    seller.delete()

    return Response(
        {
        "detail": f"Продавачът {seller_name} и неговите {images_count}бр. снимки бяха изтрити."
        },
        status=status.HTTP_200_OK
    )


class CreateChepareta(AuthorizedMixin, APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsSuperUser]

    def post(self, request, *args, **kwargs):
        try:
            with transaction.atomic():
                seller_serializer = CreateSellerSerializer(data=request.data)
                seller_serializer.is_valid(raise_exception=True)
                seller = seller_serializer.save()

                chepare_types = request.data.getlist("chepareType")
                images = request.data.getlist("image")
                if not images or not chepare_types or len(chepare_types) != len(images):
                    return Response(
                        {"detail": "Броят на снимките и типовете не съвпада."},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                images_data = [
                    {"chepare_type": ch_type, "image": image, "seller": seller.pk}
                    for ch_type, image in zip(chepare_types, images)
                ]

                image_serializer = ChepareImagesSerializer(data=images_data, many=True)
                image_serializer.is_valid(raise_exception=True)
                image_serializer.save()

                seller_data = SellerSerializer(seller, context={"request": request})
                return Response(seller_data.data, status=201)
        except Exception as e:
            return Response(
                getattr(e, "detail", {"detail": str(e)}),
                status=status.HTTP_400_BAD_REQUEST
            )