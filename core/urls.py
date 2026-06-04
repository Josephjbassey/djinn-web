from django.urls import path
from . import views
urlpatterns = [
    path('', views.landing, name='landing'),
    path('registry/', views.registry_browser, name='registry_browser'),
    path('docs/', views.docs, name='docs'),
    path('workbench/', views.workbench, name='workbench'),
    path('preview/', views.preview, name='preview'),
    path('forge/', views.forge, name='forge'),
    path('sync/', views.sync_dashboard, name='sync_dashboard'),
    path('workbench/save/', views.save_component_settings, name='save_component_settings'),
]
