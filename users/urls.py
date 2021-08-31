from django.urls import path

from . import views

urlpatterns = [
    path('users/login', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

    path('users/register', views.registerUser, name='register'),

    path('users/profile/', views.getUserProfile, name='user-profile'),
    path('users/profile/update', views.updateUserProfile, name='user-profile-update'),
    path('users', views.getUsers, name='users'),

    path("users/<str:slug>", views.getUserBySlug, name="user-get"),
    path("users/update/<str:slug>", views.updateUser, name="user-update"),

    path("users/delete/<str:slug>", views.deleteUser, name="user-delete"),
    
]