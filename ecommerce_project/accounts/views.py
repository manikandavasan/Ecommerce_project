from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from products.models import Product, Category
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from rest_framework_simplejwt.tokens import RefreshToken
# from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny

from django.views.decorators.csrf import ensure_csrf_cookie


@api_view(['POST'])
@permission_classes([AllowAny])
def signup_api(request):
    try:
        data = request.data

        username = data.get('username')
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        email = data.get('email')
        password = data.get('password')
        confirm_password = data.get('confirm_password')

        if password != confirm_password:
            return Response({'error': 'Passwords do not match'}, status=400)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=400)

        User.objects.create_user(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password
        )

        return Response({'message': 'User created successfully'}, status=201)

    except Exception as e:
        return Response({'error': str(e)}, status=500)


@api_view(['POST'])
@permission_classes([AllowAny])
def signin_api(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user:
        refresh = RefreshToken.for_user(user)

        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user_id': user.id
        })
    else:
        return Response({'error': 'Invalid credentials'}, status=401)

@api_view(['GET'])
@permission_classes([AllowAny])
def home_api(request, id):
    products = Product.objects.all().values()
    categories = Category.objects.all().values()

    return Response({
        'products': list(products),
        'categories': list(categories)
    })















# from django.shortcuts import render

# # Create your views here.
# from django.shortcuts import render, redirect
# # from .models import *
# from products.models import Product, Category
# from django.contrib.auth.models import User
# from django.contrib.auth import authenticate, login, logout

# # Create your views here.

# def signup(request):
#     if request.method == "POST":
#         try:
#             username = request.POST.get('username')
#             first_name = request.POST.get('first_name')
#             last_name = request.POST.get('last_name')
#             email = request.POST.get('email')
#             password = request.POST.get('password')
#             confirm_password = request.POST.get('confirm_password')

#             if password != confirm_password:
#                 return render(request, 'signup.html', {'error': "Password do not match"})

#             if User.objects.filter(username=username).exists():
#                 return render(request, 'signup.html', {'error': "Username already exists"})
            
#             User.objects.create_user(
#                 username = username,
#                 first_name = first_name,
#                 last_name = last_name,
#                 email = email,
#                 password = password
#             )
#             return redirect('home')

#         except Exception as e:
#             print(e)
#             return render(request, 'signup.html', {'error': str(e)})
    
#     return render(request, 'signup.html')

# def home(request):
#     featured_products = Product.objects.all()
#     categories = Category.objects.all()
#     return render(request, 'home.html', {'products': featured_products, 'categories': categories})

# def signin(request):
#     if request.method=="POST":
#         username = request.POST.get('username')
#         password = request.POST.get('password')

#         user = authenticate(request, username=username, password=password)

#         if user:
#             login(request, user)
#             return redirect('home')
#         else:
#             return render(request, 'signin.html', {'erroe': "Invalid credentials"})
#     return render(request, 'signin.html')


