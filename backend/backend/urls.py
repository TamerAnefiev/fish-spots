from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.sitemaps.views import sitemap

from fish_places.sitemap import PlaceSitemap
from base.sitemap import StaticViewSitemap
from base.sitemap import DynamicPagesSitemap

sitemaps = {
    "place_details": PlaceSitemap,
    "dynamic": DynamicPagesSitemap,
    "static": StaticViewSitemap,
}

urlpatterns = [
    path("admin/", admin.site.urls),
    path("regions/", include("fish_regions.urls")),
    path("places/", include("fish_places.urls")),
    path("profile/", include("users.urls")),
    path("chepareta/", include("chepareta.urls")),
    path("catch-history/", include("catches_history.urls")),
    path(
        "sitemap.xml/",
        sitemap,
        {"sitemaps": sitemaps},
        name="django.contrib.sitemaps.views.sitemap",
    ),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
