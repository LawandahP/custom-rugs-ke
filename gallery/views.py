from .serializers import GallerySerializer
from .models import Gallery
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response



@api_view(['GET'])
def getGallery(request):
    users = Gallery.objects.all()
    serializer = GallerySerializer(users, many=True)
    return Response(serializer.data)
