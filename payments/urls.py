from django.urls import path
from . import views

urlpatterns = [
    path('payments/lnm', views.LipaNaMpesaCallbackUrlAPIView.as_view(), name='lnm-callback-url'),
]