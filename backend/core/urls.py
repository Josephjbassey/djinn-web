from django.urls import path, include
from rest_framework.routers import DefaultRouter
from core.api.views import CategoryViewSet, ComponentViewSet, RegistryDetailView

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'components', ComponentViewSet)

urlpatterns = [
    path('v1/registry/<str:name>/', RegistryDetailView.as_view(), name='registry-detail'),
    path('', include(router.urls)),
]
