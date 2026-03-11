import random
from django.contrib.auth import get_user_model
from orders.models import Order
from orders.models import CartItem

User = get_user_model()

def run():

    users = User.objects.all()
    created_count = 0

    for user in users:

        # Avoid duplicate order for same user (optional safety)
        if Order.objects.filter(user=user).exists():
            continue

        cart_items = CartItem.objects.filter(cart__user=user)

        if not cart_items.exists():
            continue

        total = 0

        for item in cart_items:
            total += item.product.price * item.quantity

        Order.objects.create(
            user=user,
            total_amount=total,
            status=random.choice(["Pending", "Shipped", "Delivered"]),
            created_by="system",
            updated_by="system"
        )

        created_count += 1

    print(f"✅ {created_count} Orders created successfully!")
