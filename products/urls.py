from django.urls import path
from . import views
from products import re_views as reviews


urlpatterns = [
    path('products', views.getProducts, name='products'),
    

    path('products/create', views.createProduct, name='product-create'),
    path('image-upload', views.uploadImage, name='image-upload'),

    path('products/top', views.getTopProducts, name='top-products'),

    path('products/<str:slug>/', views.getProduct, name='product'),
    path('products/review/<str:slug>', reviews.createProductReview, name='create-product-review'),

    
    path('products/update/<str:slug>', views.updateProduct, name='product-update'),
    path('products/delete/<str:slug>', views.deleteProduct, name='product-delete')
]