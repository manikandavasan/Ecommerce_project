from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('product/<int:id>/', product_detail_api),
    path('category/<int:id>/', category_products_api),
    path('search/', search_api),
    path('add-category/', add_category),
    path('add-product/', add_product),
]
