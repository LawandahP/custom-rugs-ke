from rest_framework.response import Response
from products.models import Product, Review

from django.shortcuts import get_object_or_404, render
from rest_framework import serializers
from rest_framework import status


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

@api_view(['POST'])
@permission_classes([IsAuthenticated])

def createProductReview(request, slug):

    user = request.user
    product = get_object_or_404(Product, slug=slug)
    data = request.data

    # review exists
    reviewExists = product.review_set.filter(user=user).exists()

    if reviewExists:
        context = {"detail": "You have already reviewed this product"}
        return Response(context, status=status.HTTP_400_BAD_REQUEST)
    
    # no rating or 0 rating
    elif data['rating'] == 0:
        context = {"detail": "Please rate the Product"}
        return Response(context, status=status.HTTP_400_BAD_REQUEST)

    # Create review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            reviewTitle=data['reviewTitle'],
            rating=data['rating'],
            comment=data['comment']
        )

        # get number of reviews
        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        # get rating
        total = 0
        for i in reviews:
            total += i.rating
        
        product.rating = total /len(reviews)
        product.save()
        
        return Response({
            "detail": "Review added Successfully"
        }, status=status.HTTP_201_CREATED)


