# serializers.py

from rest_framework import serializers
from products.models import Product, Category

class ProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'

    def get_image(self, obj):
        try:
            return obj.image.url
        except:
            return None   # prevents crash


class CategorySerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = '__all__'

    def get_image(self, obj):
        try:
            return obj.image.url
        except:
            return None