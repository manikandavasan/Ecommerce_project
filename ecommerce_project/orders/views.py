from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.db.models import Q
from orders.models import *
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated


@api_view(['GET'])
@permission_classes([AllowAny])
def get_cart(request):
    print("working")
    print("User ", request.user)
    cart = Cart.objects.filter(user=request.user).first()
    print("cart data", cart)

    if not cart:
        return Response({'cart_items': [], 'total': 0})

    cart_items = CartItem.objects.filter(cart=cart)

    data = []
    total = 0

    for item in cart_items:
        subtotal = item.product.price * item.quantity
        total += subtotal

        data.append({
        'id': item.id,
        'product_name': item.product.name,
        'price': item.product.price,
        'quantity': item.quantity,
        'subtotal': subtotal,
        'image': item.product.image.url if item.product.image else None
    })
    print("Data", data)
    return Response({'cart_items': data, 'total': total})

from products.models import Product

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart_api(request):
    print("USER:", request.user)

    product_id = request.data.get('product_id')
    quantity = int(request.data.get('quantity', 1))  # ✅ fixed

    if quantity <= 0:
        return Response({'error': 'Quantity must be greater than 0'}, status=400)

    product = get_object_or_404(Product, id=product_id)

    cart, created = Cart.objects.get_or_create(user=request.user)

    cart_item = CartItem.objects.filter(cart=cart, product=product).first()

    if cart_item:
        cart_item.quantity += quantity
        cart_item.save()
    else:
        CartItem.objects.create(
            cart=cart,
            product=product,
            quantity=quantity
        )

    return Response({'message': 'Added successfully'})
    
@api_view(['DELETE'])
def delete_from_cart_api(request, id):
    cart_item = get_object_or_404(CartItem, id=id, cart__user=request.user)
    cart_item.delete()
    return Response({'message': 'Item removed'})


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_cart_api(request, id):
    quantity = int(request.data.get('quantity'))
    print(quantity)
    cart_item = get_object_or_404(CartItem, id=id, cart__user=request.user)

    if quantity > 0:
        cart_item.quantity = quantity
        cart_item.save()
    else:
        cart_item.delete()

    return Response({'message': 'Cart updated'})



@api_view(['GET'])
def checkout_api(request):
    cart = Cart.objects.filter(user=request.user).first()

    if not cart:
        return Response({'cart_items': [], 'total': 0})

    cart_items = CartItem.objects.filter(cart=cart)

    total = 0
    data = []

    for item in cart_items:
        subtotal = item.product.price * item.quantity
        total += subtotal

        data.append({
            'product': item.product.name,
            'quantity': item.quantity,
            'price': item.product.price
        })

    return Response({'cart_items': data, 'total': total})


@api_view(['POST'])
def place_order_api(request):
    cart = Cart.objects.filter(user=request.user).first()

    if not cart:
        return Response({'error': 'Cart is empty'}, status=400)

    cart_items = CartItem.objects.filter(cart=cart)

    if not cart_items.exists():
        return Response({'error': 'Cart is empty'}, status=400)

    total = 0
    for item in cart_items:
        total += item.product.price * item.quantity

    order = Order.objects.create(
        user=request.user,
        total_amount=total,
        status="Paid"
    )

    for item in cart_items:
        OrderItem.objects.create(
            order=order,
            product=item.product,
            quantity=item.quantity,
            price=item.product.price
        )

    cart_items.delete()

    return Response({'message': 'Order placed successfully'})


@api_view(['GET'])
def my_orders_api(request):
    orders = Order.objects.filter(user=request.user).prefetch_related('orderitem_set__product')
    data = []
    for order in orders:
        items = []
        for item in order.orderitem_set.all():
            items.append({
                'id': item.id,
                'name': item.product.name,
                'quantity': item.quantity,
                'price': item.price
            })

        data.append({
            'order_id': order.id,
            'total': order.total_amount,
            'status': order.status,
            'items': items
        })

    return Response(data)
