from django.shortcuts import render, redirect, get_object_or_404
from products.models import *
from orders.models import *
from django.contrib.auth.decorators import login_required

# Create your views here.


def shopping_cart(request):
    cart = Cart.objects.filter(user=request.user).first()
    cart_items = CartItem.objects.filter(cart=cart) if cart else []
    total = 0
    for item in cart_items:
        total += item.product.price * item.quantity
    return render(request, 'shopping_cart.html', {'cart':cart, 'cart_items':cart_items, 'total':total})

@login_required
def add_to_cart(request, id):
    product = get_object_or_404(Product, id=id)

    cart, created = Cart.objects.get_or_create(user=request.user)

    cart_item = CartItem.objects.filter(cart=cart, product=product).first()

    if cart_item:
        cart_item.quantity += 1
        cart_item.updated_by = request.user.username
        cart_item.save()
    else:
        CartItem.objects.create(
            cart=cart,
            product=product,
            quantity=1,
            created_by=request.user.username,
            updated_by=request.user.username
        )
    return redirect('shopping_cart')


@login_required
def delete_from_cart(request, id):
    
    cart_item = get_object_or_404(CartItem, id=id, cart__user=request.user)
    
    if cart_item:
        cart_item.delete()
    
    return redirect('shopping_cart')

@login_required
def update_cart(request, id):


    if request.method == "POST":
        quantity = int(request.POST.get('quantity'))

        cart_item = get_object_or_404(
            CartItem,
            id=id,
            cart__user=request.user
        )
        
        if quantity>0:
            cart_item.quantity = quantity
            cart_item.updated_by = request.user.username
            cart_item.save()
        else:cart_item.delete()

    return redirect('shopping_cart')


def checkout_page(request):
    cart = Cart.objects.filter(user=request.user).first()
    cart_items = CartItem.objects.filter(cart=cart) if cart else []
    total = 0
    for item in cart_items:
        total += item.product.price * item.quantity
    return render(request, 'checkout_page.html', {'cart_items':cart_items, 'total':total})

def payment(request):
    return render(request, 'payment.html')


def place_order(request):
    cart = Cart.objects.filter(user=request.user).first()

    if not cart:
        return redirect('shopping_cart')
    
    cart_items = CartItem.objects.filter(cart=cart)

    if not cart_items.exists():
        return redirect('shopping_cart')
    
    total=0
    for item in cart_items:
        total += item.product.price * item.quantity

        order = Order.objects.create(
            user=request.user,
            total_amount = total,
            status="Paid",
            created_by=request.user.username,
            updated_by=request.user.username
        )
    
    for item in cart_items:
        OrderItem.objects.create(
            order=order,
            product=item.product,
            quantity=item.quantity,
            price=item.product.price,
            created_by=request.user.username,
            updated_by=request.user.username
        )
    cart_items.delete()

    return redirect('home')


def my_orders(request):
    ordered_id = Order.objects.filter(user=request.user).values_list('id', flat=True)
    print("ordered_id",ordered_id)
    order_items = OrderItem.objects.filter(order=ordered_id)
    print("details", order_items)
    return render(request, 'my_orders.html', {'order_items': order_items})