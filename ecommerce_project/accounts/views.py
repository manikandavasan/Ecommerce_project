from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from products.models import Product, Category
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from .serializers import *
from django.views.decorators.csrf import ensure_csrf_cookie


@api_view(['POST'])
@permission_classes([AllowAny])
def signup_api(request):
    print("REQUEST DATA:", request.data)
    try:
        data = request.data

        username = data.get('username')
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        email = data.get('email')
        password = data.get('password')
        confirm_password = data.get('confirm_password')

        missing = []
        if not username:
            missing.append("username")
        if not email:
            missing.append("email")
        if not password:
            missing.append("password")

        if missing:
            return Response(
                {'error': f'Missing fields: {", ".join(missing)}'},
                status=400
    )

        if password != confirm_password:
            return Response({'error': 'Passwords do not match'}, status=400)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=400)

        user = User.objects.create_user(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password
        )

        user.save()

        return Response({'message': 'User created successfully'}, status=201)

    except Exception as e:
        print("Signup error:", e)
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
@permission_classes([IsAuthenticated])
def home_api(request):
    try:
        products = Product.objects.all()
        categories = Category.objects.all()

        product_serializer = ProductSerializer(
            products, many=True, context={'request': request}
        )
        category_serializer = CategorySerializer(
            categories, many=True, context={'request': request}
        )

        return Response({
            "products": product_serializer.data,
            "categories": category_serializer.data
        })

    except Exception as e:
        print("HOME API ERROR:", str(e))
        return Response({"error": str(e)}, status=500)


@api_view(['DELETE'])
def debug_db(request):
    from products.models import Product

    Product.objects.filter(
        name="Men's Slim Fit Casual TShirt",
        category_id=2
    ).delete()

    Product.objects.filter(
        name="Women's Floral Maxi Dress",
        category_id=2
    ).delete()

    Product.objects.filter(
        name="Atomic Habits",
        category_id=5
    ).delete()

    Product.objects.filter(
        name="Samsung 55 4k Samrt TV",
        category_id=5
    ).delete()

    return Response({
        "message": "Products deleted successfully"
    })


