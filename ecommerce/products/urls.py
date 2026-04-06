from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('product_detail/<int:id>', product_detail, name='product_detail'),
    path('product_category_list/<int:id>', product_category_list, name='product_category_list'),
    path('search/', search_view, name='search')
]