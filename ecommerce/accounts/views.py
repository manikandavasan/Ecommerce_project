from django.shortcuts import render, redirect
# from .models import *
from products.models import Product, Category
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout

# Create your views here.

def signup(request):
    if request.method == "POST":

        try:
            username = request.POST.get('username')
            first_name = request.POST.get('first_name')
            last_name = request.POST.get('last_name')
            email = request.POST.get('email')
            password = request.POST.get('password')
            confirm_password = request.POST.get('confirm_password')

            if password != confirm_password:
                return render(request, 'signup.html', {'error': "Password do not match"})

            if User.objects.filter(username=username).exists():
                return render(request, 'signup.html', {'error': "Username already exists"})
            
            User.objects.create_user(
                username = username,
                first_name = first_name,
                last_name = last_name,
                email = email,
                password = password
            )
            return redirect('home')

        except Exception as e:
            print(e)
            return render(request, 'signup.html', {'error': str(e)})
    
    return render(request, 'signup.html')

def home(request):
    featured_products = Product.objects.all()
    categories = Category.objects.all()
    return render(request, 'home.html', {'products': featured_products, 'categories': categories})

def signin(request):
    if request.method=="POST":
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user:
            login(request, user)
            return redirect('home')
        else:
            return render(request, 'signin.html', {'erroe': "Invalid credentials"})
    return render(request, 'signin.html')
        