from orders.models import Order, OrderItem, CartItem

def run():

    orders = Order.objects.all()
    created_count = 0

    for order in orders:

        # Avoid duplicate orderitems
        if OrderItem.objects.filter(order=order).exists():
            continue

        cart_items = CartItem.objects.filter(cart__user=order.user)

        for item in cart_items:

            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price,
                created_by="system",
                updated_by="system"
            )

            created_count += 1

    print(f"✅ {created_count} OrderItems created successfully!")
