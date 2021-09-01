from django.urls import path
from . import views

urlpatterns = [
    path('payments/lnm-stk-push', views.lipaNaMpesaOnlineStkPush, name='lnm-stk-push'),
    path('payments/lnm', views.LipaNaMpesaCallbackUrlAPIView.as_view(), name='lnm-callback-url'),
]