from faker import Faker
import random
from products.models import Product, Category

def run():
    fake = Faker()
    categories = list(Category.objects.all())

    product_types = [
        "Smartphone", "Laptop", "Bluetooth Speaker", "Headphones",
        "Running Shoes", "T-Shirt", "Jeans", "Wrist Watch",
        "Coffee Maker", "Gaming Mouse", "Office Chair",
        "LED TV", "Tablet", "Water Bottle",
        "Electric Kettle", "Desk Lamp",
        "Power Bank", "Air Conditioner",
        "Refrigerator", "Microwave Oven",
        "Backpack", "Handbag",
        "Perfume", "Face Cream",
        "Protein Powder", "Yoga Mat",
        "Cycling Helmet", "Sunglasses",
        "Smart Watch", "Printer"
    ]

    products = []

    for i in range(300):
        brand = fake.company()
        product_name = random.choice(product_types)
        price = random.randint(500, 75000)
        stock = random.randint(5, 200)

        product = Product(
            category=random.choice(categories),
            name=f"{brand} {product_name}",
            description=fake.text(max_nb_chars=200),
            price=price,
            stock=stock,
            created_by="system",
            updated_by="system"
        )

        products.append(product)

    Product.objects.bulk_create(products)

    print("✅ 300 Realistic Products Created Successfully!")
