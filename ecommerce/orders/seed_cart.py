from django.contrib.auth import get_user_model
from orders.models import Cart

User = get_user_model()

def run():

    users = User.objects.all()

    created_count = 0

    for user in users:
        # Avoid duplicate cart
        if not Cart.objects.filter(user=user).exists():
            Cart.objects.create(user=user)
            created_count += 1

    print(f"✅ {created_count} Cart records created successfully!")
