from django.urls import path
from . import views



urlpatterns = [
    path('gallery', views.getGallery, name='list-gallery'),
]