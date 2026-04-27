from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.db.models import Q
from products.models import *
from rest_framework.permissions import IsAuthenticated
from .serializers import *


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









# from django.shortcuts import render, redirect, get_object_or_404
# from .models import *
# from django.db.models import Q
# # Create your views here.

# def product_detail(request, id):
#     product = get_object_or_404(Product, id=id)
#     print(product.category_id)
#     related_products = Product.objects.filter(category_id=product.category_id).exclude(id=product.id)
#     return render(request, 'product_detail.html', {'product': product, 'related_products':related_products})

# def product_category_list(request, id):

#     category_name =  get_object_or_404(Category, id=id)
#     products = Product.objects.filter(category_id=id)
#     return render(request, 'product_category_list.html', {'products':products, 'category_name': category_name})

# def search_view(request):
#     query = request.GET.get('q')
#     print(query)
#     results = []
#     if query:
#         results = Product.objects.filter(
#             Q(name__icontains=query) | Q(description__icontains=query)
#         )
#         print(results)
#         print(query)
#     return render(request, 'search_results.html', {'results': results, 'query': query})