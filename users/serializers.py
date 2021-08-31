from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken


User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField(read_only=True)
    full_name = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'phone_number', 'isAdmin', 'username', 'full_name', 'slug']
    
    def get_isAdmin(self, obj):
        return obj.is_staff
    
    def get_username(self, obj):
        return obj.first_name

    def get_full_name(self, obj):
        return f'{obj.first_name} {obj.last_name}'

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'phone_number', 'isAdmin', 'username', 'full_name', 'slug', 'token']
    
    
    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
    
 
