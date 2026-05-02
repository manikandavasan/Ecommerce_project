from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.db.models import Q
from products.models import *
from rest_framework.permissions import IsAuthenticated
from .serializers import *
import cloudinary.uploader
from .models import *


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def product_detail_api(request, id):
    print("ProductID", id)
    product = get_object_or_404(Product, id=id)
    product_serializer = ProductSerializer(product)
    print("Data", product_serializer)

    related_products = Product.objects.filter(
        category=product.category
    ).exclude(id=product.id)
    related_products_serializer = ProductSerializer(related_products, many=True)
    print("product", product_serializer.data)
    print("related_product", related_products_serializer.data)

    return Response({
        'product': product_serializer.data,
        'related_products': list(related_products_serializer.data)
    })

@api_view(['GET'])
def category_products_api(request, id):
    category = get_object_or_404(Category, id=id)
    products = Product.objects.filter(category_id=id)
    category_serializer = ProductSerializer(products, many=True)
    print("DataProduct", category_serializer.data)

    return Response({
        'category': category_serializer.data,
        'products': list(products.values())
    })

@api_view(['GET'])
def search_api(request):
    query = request.GET.get('q', '')

    results = Product.objects.filter(
        Q(name__icontains=query) | Q(description__icontains=query)
    )

    return Response({
        'query': query,
        'results': list(results.values())
    })



@api_view(['POST'])
def add_category(request):
    name = request.data.get('name')
    image = request.FILES.get('image')  # 🔥 important

    if not image:
        return Response({"error": "Image required"}, status=400)

    category = Category.objects.create(
        name=name,
        image=image
    )

    return Response({"message": "Category created"}, status=201)


@api_view(['POST'])
def add_product(request):
    name = request.data.get('name')
    category_id = request.data.get('category')
    file = request.FILES.get('image')

    if not file:
        return Response({"error": "Image is required"}, status=400)

    category = Category.objects.get(id=category_id)

    result = cloudinary.uploader.upload(file, folder="products")

    product = Product.objects.create(
        name=name,
        category=category,
        image=result['secure_url'],
        description=request.data.get('description'),
        price=request.data.get('price'),
        stock=request.data.get('stock'),
        created_by="admin",
        updated_by="admin"
    )

    return Response({
        "message": "Product created",
        "image": product.image
    })