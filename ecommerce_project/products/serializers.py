from rest_framework import serializers
from .models import *



class ProductSerializer(serializers.ModelSerializer):
    image = serializers.URLField()

    class Meta:
        model = Product
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    image = serializers.URLField()

    class Meta:
        model = Category
        fields = '__all__'

