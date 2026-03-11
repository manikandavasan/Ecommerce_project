import random
from orders.models import Cart, CartItem
from products.models import Product

def run():

    carts = list(Cart.objects.all())
    products = list(Product.objects.all())

    if not carts:
        print("❌ No carts found. Create carts first.")
        return

    if not products:
        print("❌ No products found.")
        return

    created_count = 0

    for cart in carts:

        # Each cart gets 2 to 5 products
        selected_products = random.sample(products, random.randint(2, 5))

        for product in selected_products:

            # Avoid duplicate product in same cart
            if not CartItem.objects.filter(cart=cart, product=product).exists():

                CartItem.objects.create(
                    cart=cart,
                    product=product,
                    quantity=random.randint(1, 3),
                    created_by="system",
                    updated_by="system"
                )

                created_count += 1

    print(f"✅ {created_count} CartItems created successfully!")
