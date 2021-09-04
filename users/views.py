from datetime import date
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.shortcuts import get_object_or_404
from rest_framework import serializers

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status

from .serializers import UserSerializer, UserSerializerWithToken

User = get_user_model()


def validate_field(value):
    email_qs = User.objects.filter(email=value)
    phone_number_qs = User.objects.filter(phone_number=value)

    if phone_number_qs.exists():
        message = {'detail':"User with this phonenumber already exists"}
        return Response(message, status=status.HTTP_404_NOT_FOUND)

    elif email_qs.exists():
        message = {'detail':"User with this phonenumber already exists"}
        return Response(message, status=status.HTTP_404_NOT_FOUND)



# customize jwt
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # Add custom claims by looping over UserSerializerWithToken
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
     

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def registerUser(request):
    data = request.data

    try:
        user_email = getUserByEmail(data['email'])
        user_phone_number = getUserByPhoneNumber(data['phone_number'])
        if user_email:
            message = {'detail':"User with this email already exists"}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
        else:
            if user_phone_number:
                message = {'detail':"User with this phonenumber already exists"}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)

    except User.DoesNotExist as e:
        user = User.objects.create(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            phone_number=data['phone_number'],
            password=make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
        

        
        
    
    
        

    # except:
    #     if user.phone_number in registered_user:
    #         message = {'detail':"User with this phonenumber already exists"}
    #         return Response(message, status=status.HTTP_404_NOT_FOUND)
    #     elif user['email'] in registered_user:
    #         message = {'detail':"User with this email already exists"}
    #         return Response(message, status=status.HTTP_404_NOT_FOUND)



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data

    user.first_name = data['first_name']
    user.last_name = data['last_name']
    user.email = data['email']
    user.phone_number = data['phone_number']

    
    if data['password'] != '':
        user.password = make_password(data['password'])
    user.save()

    message = {'detail':"User with this phonenumber already exists"}
    return Response(serializer.data, status=status.HTTP_200_OK)

    

# get user profile
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserBySlug(request, slug):
    users = User.objects.get(slug=slug)
    serializer = UserSerializer(users, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request, slug):
    user = User.objects.get(slug=slug)
    data = request.data

    user.first_name = data['first_name']
    user.last_name = data['last_name']
    user.email = data['email']
    user.phone_number = data['phone_number']
    user.is_staff = data['isAdmin']

    user.save()
    serializer = UserSerializer(user, many=False)

    return Response(serializer.data, status=status.HTTP_200_OK)





@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, slug):
    user = User.objects.get(slug=slug)
    user.delete()
    return Response("User deleted successfully")


def getUserByEmail(email):
    user = User.objects.get(email__exact=email)
    return user

def getUserByPhoneNumber(phone_number):
    user = User.objects.get(phone_number=phone_number)
    return user





