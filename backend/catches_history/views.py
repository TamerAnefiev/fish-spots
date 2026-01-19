from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from django.db.models import Sum, Min
from django.utils.timezone import now

from .models import CatchHistory
from .serializers import CatchHistorySerializer
from fish_regions.settings import english_to_bulgarian_months
from users.backends import CustomAuthentication

from datetime import datetime
import calendar


@api_view(["GET"])
@authentication_classes([CustomAuthentication])
@permission_classes([IsAuthenticated])
def get_oldest_catch_year(request):
    oldest_date_obj = CatchHistory.objects.filter(user=request.user).aggregate(
        oldest_date=Min("date")
    )
    oldest_year = (
        oldest_date_obj["oldest_date"].year
        if oldest_date_obj["oldest_date"]
        else now().year
    )

    return Response({"oldestYear": oldest_year}, status=status.HTTP_200_OK)


@api_view(["GET"])
@authentication_classes([CustomAuthentication])
@permission_classes([IsAuthenticated])
def catch_stats(request):
    # e.g: catch_history/?page_size=10&page=1&year=2025&month=5&ordering=-date

    year_param = request.query_params.get("year")
    month_param = request.query_params.get("month")  # 1-12 expected
    ordering = request.query_params.get("ordering", "-date")
    allowed_order_by_fields = {
        "date",
        "-date",
        "quantity",
        "-quantity",
        "snaps",
        "-snaps",
    }

    if ordering not in allowed_order_by_fields:
        return Response({"error": "Bad order."}, status=status.HTTP_400_BAD_REQUEST)

    now = datetime.now()
    try:
        year = int(year_param) if year_param else now.year
    except ValueError:
        year = now.year

    try:
        month = int(month_param) if month_param else now.month
    except ValueError:
        month = now.month

    yearly_stats = CatchHistory.objects.filter(
        date__year=year, user=request.user
    ).aggregate(total_catch=Sum("quantity"), total_snaps=Sum("snaps"))
    yearly_stats["year"] = year

    monthly_qs = CatchHistory.objects.filter(
        date__year=year, date__month=month, user=request.user
    )
    monthly_stats = monthly_qs.aggregate(
        total_catch=Sum("quantity"), total_snaps=Sum("snaps")
    )
    monthly_stats["month"] = month
    monthly_stats["month_name_bg"] = english_to_bulgarian_months[
        calendar.month_name[month]
    ]

    paginator = PageNumberPagination()
    page_size_param = request.query_params.get("pageSize")
    if page_size_param is None or not page_size_param.isdigit():
        page_size_param = 10

    paginator.page_size = int(page_size_param)
    paginated_result = paginator.paginate_queryset(
        monthly_qs.order_by(ordering), request
    )
    serialized_data = CatchHistorySerializer(paginated_result, many=True)

    return Response(
        {
            "yearlyStats": yearly_stats,
            "monthlyStats": monthly_stats,
            "results": serialized_data.data,
            "pagination": {
                "current_page": paginator.page.number,
                "totalItems": paginator.page.paginator.count,
                "totalPages": paginator.page.paginator.num_pages,
                "pageSize": paginator.page_size,
                "hasNext": paginator.page.has_next(),
                "hasPrevious": paginator.page.has_previous(),
                "nextPage": (
                    paginator.page.next_page_number()
                    if paginator.page.has_next()
                    else None
                ),
                "previousPage": (
                    paginator.page.previous_page_number()
                    if paginator.page.has_previous()
                    else None
                ),
            },
        }
    )


@api_view(["POST"])
@authentication_classes([CustomAuthentication])
@permission_classes([IsAuthenticated])
def create_catch_history(request):
    serializer = CatchHistorySerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    serializer.save(user=request.user)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["DELETE"])
@authentication_classes([CustomAuthentication])
@permission_classes([IsAuthenticated])
def delete_catch_history(request, pk):
    try:
        # check if the user is the author and fetch the object owned by the user
        catch = CatchHistory.objects.get(pk=pk, user=request.user)
    except CatchHistory.DoesNotExist:
        return Response(
            {"detail": "Записът не съществува."}, status=status.HTTP_400_BAD_REQUEST
        )

    catch.delete()
    return Response(
        {"detail": "Записът беше изтрит успешно."}, status=status.HTTP_200_OK
    )
