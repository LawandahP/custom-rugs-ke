from django.urls import path
from . import views



urlpatterns = [
    path('mpesa_access_token', views.getAccessToken, name='mpesa-token'),
]