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
            if obj.image:
                return str(obj.image)
            return None
        except:
            return None

class CategorySerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = '__all__'

    def get_image(self, obj):
        try:
            if obj.image:
                return str(obj.image)
            return None
        except:
            return None