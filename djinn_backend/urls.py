from django.contrib import admin
from django.urls import path, include
urlpatterns = [
    path('admin/', admin.site.urls),
    path('__browser_reload__/', include('django_browser_reload.urls')),
    path('', include('core.urls')),
    path('api/', include('registry.urls')),
]
