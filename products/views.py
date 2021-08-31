
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from django.shortcuts import get_object_or_404, render
from rest_framework import serializers

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .models import Product, Review
from .serializers import ProductSerializer



@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('search')
    if query == None:
        query = '' 

    products = Product.objects.filter(name__icontains=query)

    # Pagination
    page = request.query_params.get('page')
    paginator = Paginator(products, 4)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)
    
    if page == None:
        page = 1
    
    page = int(page)
    serializer = ProductSerializer(products, many=True)
    return Response(
        {
            "products": serializer.data, 
            "page": page, 
            "pages": paginator.num_pages
        }
    )

@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def getProduct(request, slug):
    product = get_object_or_404(Product, slug=slug)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    
    product = Product.objects.create(
        user=user,
        name="Product Name",
        price=0,
        countInStock=0,
        category='Choose Category',
        description="About the Product..."
    )
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, slug):
    data = request.data
    product = get_object_or_404(Product, slug=slug)

    product.name         = data['name']
    product.price        = data['price']
    product.image        = data['image']
    product.category     = data['category']
    product.description  = data['description']
    product.countInStock = data['countInStock']

    product.save()
    

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, slug):
    product = get_object_or_404(Product, slug=slug)
    product.delete()
    return Response("Product deleted")


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def uploadImage(request):
    data = request.data

    slug = data['product_slug']
    product = get_object_or_404(Product, slug=slug)

    product.image = request.FILES.get('image')

    
    product.save()
    return Response('Image was Uploaded')