from rest_framework import serializers
from . import models
# from .serializers import CategorySerializer
class SellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Seller
        fields = ['id','user','address']
    
    def __init__(self, *args, **kwargs):
        super(SellerSerializer,self).__init__(*args, **kwargs)
        # self.Meta.depth=1


class SellerDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Seller
        fields = ['id','user','address']

    def __init__(self, *args, **kwargs):
        super(SellerDetailSerializer,self).__init__(*args, **kwargs)
        # self.Meta.depth=1

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProductCategory
        fields = ['id','title','detail']
        # depth = 1
    
    # def __init__(self, *args, **kwargs):
    #     super(CategorySerializer,self).__init__(*args, **kwargs)
    #     self.Meta.depth=1

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProductImage
        fields = ['id', 'product', 'image']  
   

class ProductListSerializer(serializers.ModelSerializer):
    product_ratings=serializers.StringRelatedField(many=True, read_only=True)
    category = CategorySerializer(read_only=True)  # This shows full info instead of just ID

    # category_info = serializers.SerializerMethodField()
    category_id = serializers.PrimaryKeyRelatedField(
    queryset=models.ProductCategory.objects.all(),
    write_only=True,
    source='category'
    )

    product_imgs = ProductImageSerializer(many=True, read_only=True)
    class Meta:
        model = models.Product
        fields = '__all__'
    #     extra_fields = ['category_info']  # just for display
    # def get_category_info(self, obj):
    #     if obj.category:
    #         return {
    #             "id": obj.category.id,
    #             "title": obj.category.title,
    #             "detail": obj.category.detail
    #         }
    #     return None

    def __init__(self, *args, **kwargs):
        super(ProductListSerializer,self).__init__(*args, **kwargs)
        self.Meta.depth=1
    
    def create(self, validated_data):
        # Create the product instance
        product = models.Product.objects.create(**validated_data)

        # Handle extra uploaded images if present
        request = self.context.get('request')
        if request and request.FILES:
            for img in request.FILES.getlist('product_imgs'):
                models.ProductImage.objects.create(product=product, image=img)

        return product

class ProductDetailSerializer(serializers.ModelSerializer):
    product_ratings=serializers.StringRelatedField(many=True, read_only=True)
    product_imgs=ProductImageSerializer(many=True, read_only=True)
    class Meta:
        # many = True
        model = models.Product
        fields = ['id','category','seller','title','slug','tag_list','detail','price','product_ratings','product_imgs']

    def __init__(self, *args, **kwargs):
        super(ProductDetailSerializer,self).__init__(*args, **kwargs)
        # self.Meta.depth=1 


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Customer
        fields = ['id','user']
        depth=1
    
    # def __init__(self, *args, **kwargs):
    #     super(CustomerSerializer,self).__init__(*args, **kwargs)
    #     self.Meta.depth=1

class CustomerDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Customer
        fields = ['id','user']

    def __init__(self, *args, **kwargs):
        super(CustomerDetailSerializer,self).__init__(*args, **kwargs)  
        self.Meta.depth=1

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Order
        fields = ['id','customer']
    
    def __init__(self, *args, **kwargs):
        super(OrderSerializer,self).__init__(*args, **kwargs)
        self.Meta.depth=1

class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.OrderItems
        fields = ['id','order','product']
    
    def __init__(self, *args, **kwargs):
        super(OrderDetailSerializer,self).__init__(*args, **kwargs)
        self.Meta.depth=1

# class CustomerAddressSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.CustomerAddress
#         fields = ['id','customer','address','default_address']
    
#     def __init__(self, *args, **kwargs):
#         super(CustomerAddressSerializer,self).__init__(*args, **kwargs)
#         self.Meta.depth=1

class ProductRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProductRating
        fields = ['id','customer','product','ratings','reviews','add_time']
    
    def __init__(self, *args, **kwargs):
        super(ProductRatingSerializer,self).__init__(*args, **kwargs)
        self.Meta.depth=1

class CategoryDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProductCategory
        fields = ['id','title','detail']
        depth = 1
    
    def __init__(self, *args, **kwargs):
        super(CategoryDetailSerializer,self).__init__(*args, **kwargs)
        # self.Meta.depth=1

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        if hasattr(user, 'seller'):
            token['seller_id'] = user.seller.id
        elif hasattr(user, 'customer'):
            token['customer_id'] = user.customer.id
        return token