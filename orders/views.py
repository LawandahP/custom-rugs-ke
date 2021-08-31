from re import S
from django.shortcuts import get_object_or_404, render
from rest_framework import status

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from products.models import Product, Order, OrderItem, ShippingAddress
from products.serializers import ProductSerializer

from orders.serializers import OrderSerializer 

from datetime import datetime

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders= user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders= Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems']
    if orderItems and len(orderItems) == 0:
        return Response({
            "detail": "No Order Items Found"
        }, status=status.HTTP_400_BAD_REQUEST)

    else:
        # 1. create order
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice']
            
        ) 
        # 2. Create ShippingAddress 
        shipping = ShippingAddress.objects.create(
            order=order,
            county=data['shippingAddress']['county'],
            subCounty=data['shippingAddress']['subCounty'],
            ward=data['shippingAddress']['ward'],
            shippingCompany=data['shippingAddress']['shippingCompany'],
            

        )
        # 3. Create OrderItems and set Order to order Itm r/ship
        for i in orderItems:
            product = Product.objects.get(slug=i['product'])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['Qty'],
                price=i['price'],
                image=product.image.url

            )
            # 4. Update Stock Number for odered item
            product.countInStock -= item.qty
            product.save()


        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderBySlug(request, slug):

    user = request.user
    order = Order.objects.get(slug=slug)

    try:
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        
        else:
            Response(
                {"detail": "You're not authorized to view this order"},
                status=status.HTTP_401_UNAUTHORIZED)
    except:
        return Response({
            "detail": "Order does not exist"
        },
        status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])        
def updateOrderToPaid(request, slug):
    order = get_object_or_404(Order, slug=slug)

    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()

    return Response({"detail": "Transaction Successfull"}, status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAdminUser])        
def updateOrderToDelivered(request, slug):
    order = get_object_or_404(Order, slug=slug)

    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()

    return Response({"detail": "Order Delivered Successfully  "}, status=status.HTTP_200_OK)