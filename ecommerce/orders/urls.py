from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('shopping_cart/', shopping_cart, name='shopping_cart'),
    path('add_to_cart/<int:id>', add_to_cart, name='add_to_cart'),
    path('delete_from_cart/<int:id>', delete_from_cart, name='delete_from_cart'),
    path('update_cart/<int:id>', update_cart, name="update_cart"),
    path('checkout_page', checkout_page, name='checkout_page'),
    path('payment', payment, name='payment'),
    path('place_order', place_order, name='place_order'),
    path('my_orders', my_orders, name='my_orders'),
]