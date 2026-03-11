from django.shortcuts import render, redirect, get_object_or_404
from .models import Product, Category
# Create your views here.

def product_detail(request, id):
    product = get_object_or_404(Product, id=id)
    print(product.category_id)
    related_products = Product.objects.filter(category_id=product.category_id).exclude(id=product.id)
    return render(request, 'product_detail.html', {'product': product, 'related_products':related_products})

def product_category_list(request, id):

    category_name =  get_object_or_404(Category, id=id)
    products = Product.objects.filter(category_id=id)
    return render(request, 'product_category_list.html', {'products':products, 'category_name': category_name})