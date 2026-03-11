from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('home/', home, name='home'),
    path('signin/', signin, name='signin')
]