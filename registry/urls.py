from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api.views import CategoryViewSet, RegistryDetailView
router = DefaultRouter(); router.register(r'categories', CategoryViewSet)
urlpatterns = [path('v1/registry/<str:name>/', RegistryDetailView.as_view()), path('', include(router.urls))]
