from django.urls import path
from . import views


urlpatterns = [
    
    path('orders', views.getOrders, name='orders'),
    path('orders/add', views.addOrderItems, name='orders-add'),
    path('myorders', views.getMyOrders, name='myorders'),

    path('orders/deliver/<str:slug>', views.updateOrderToDelivered, name='order-delivered'),
    path('orders/<str:slug>', views.getOrderBySlug, name='user-order'),
    path('orders/pay/<str:slug>', views.updateOrderToPaid, name='pay'),
    
    
]