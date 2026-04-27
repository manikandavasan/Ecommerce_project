from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('signup/', signup_api, name='signup'),
    path('home/<int:id>/', home_api, name='home'),
    path('signin/', signin_api, name='signin'),
    # path('csrf/', get_csrf),
]
