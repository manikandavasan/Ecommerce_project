from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('cart/', get_cart),
    path('cart/add/', add_to_cart_api),
    path('cart/delete/<int:id>/', delete_from_cart_api),
    path('cart/update/<int:id>/', update_cart_api),
    path('checkout/', checkout_api),
    path('place-order/', place_order_api),
    path('my_orders/', my_orders_api),
]

