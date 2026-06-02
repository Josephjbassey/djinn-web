from django.urls import path
from . import views
urlpatterns = [path('', views.landing, name='landing'), path('registry/', views.registry_browser, name='registry_browser'), path('preview/', views.preview, name='preview'), path('workbench/', views.workbench, name='workbench')]
