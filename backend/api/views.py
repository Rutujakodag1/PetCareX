# from django.shortcuts import render
from rest_framework import generics,permissions,viewsets,pagination
from . import models
from . import serializers
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt 
from django.contrib.auth.models import User


# Create your views here.
class SellerList(generics.ListCreateAPIView):
    queryset = models.Seller.objects.all()
    serializer_class = serializers.SellerSerializer

class SellerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Seller.objects.all()
    serializer_class = serializers.SellerDetailSerializer


class ProductList(generics.ListCreateAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductListSerializer
    pagination_class = pagination.PageNumberPagination

    def get_queryset(self):
        qs = super().get_queryset()
        # category = self.request.GET.get('category')  # Use .get() instead of []
        # category = models.ProductCategory.objects.get(id = category)
        # qs = qs.filter(category = category)
        
        # # Get the category parameter from the request
        # category_id = self.request.GET.get('category', None)

        # if category:
        #     try:
        #         # Try to fetch the category
        #         category = models.ProductCategory.objects.get(id=category)
        #         qs = qs.filter(category=category)  # Filter products by category
        #     except models.ProductCategory.DoesNotExist:
        #         # Handle the case where the category does not exist
        #         qs = qs.none()  # If category doesn't exist, return no products
        if 'category' in self.request.GET:
            category = self.request.GET['category']
            category = models.ProductCategory.objects.get(id = category)
            qs = qs.filter(category = category)
        return qs


class TagProductList(generics.ListCreateAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductListSerializer
    pagination_class = pagination.PageNumberPagination

    def get_queryset(self):
        qs = super().get_queryset()
        tag = self.kwargs['tag']
        qs = qs.filter(tags__icontains = tag)
        return qs




class RelatedProductList(generics.ListCreateAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductListSerializer
    pagination_class = pagination.PageNumberPagination

    def get_queryset(self):
        qs = super().get_queryset()
        product_id = self.kwargs['pk']
        product = models.Product.objects.get(id=product_id)
        qs = qs.filter(category = product.category).exclude(id = product_id)
        return qs

class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductDetailSerializer

class CustomerList(generics.ListCreateAPIView):
    queryset = models.Customer.objects.all()
    serializer_class = serializers.CustomerSerializer


class CustomerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Customer.objects.all()
    serializer_class = serializers.CustomerDetailSerializer

class OrderList(generics.ListCreateAPIView):
    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderSerializer


@csrf_exempt
def customer_login(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(username=username,password=password)
    if user:
        msg = {
            'bool' : True,
            'user' : user.username
        }
    else:
        msg = {
            'bool' : False,
            'msg' : 'Invalid Username/Password'
        }
    return JsonResponse(msg)



@csrf_exempt
def customer_register(request):
    if request.method == "POST":
        username = request.POST.get('username')
        email = request.POST.get('email')
        # mobile = request.POST.get('mobile')
        password = request.POST.get('password')
        # Check if user already exists
        if User.objects.filter(email=email).exists():
                return JsonResponse({'bool': False, 'msg': 'Email already registered'})

        user = User.objects.create_user(
            username=email,
            email = email,
            # mobile = mobile,
            password = password,
        )
        user.save()
        customer = models.Customer.objects.create(
                user = user,
                # mobile = mobile
            )
        return JsonResponse({
                'bool': True,
                'user': user.id,
                'customer': customer.id
            })
    return JsonResponse({'bool': False, 'msg': 'Invalid request method'})


class OrderDetail(generics.ListAPIView):
    # queryset = models.OrderItems.objects.all()
    serializer_class = serializers.OrderDetailSerializer

    def get_queryset(self):
        order_id=self.kwargs['pk']
        order = models.Order.objects.get(id=order_id)
        order_items = models.OrderItems.objects.filter(order=order)
        return order_items

class CustomerAddressViewSet(viewsets.ModelViewSet):
    serializer_class=serializers.CustomerAddressSerializer
    queryset=models.CustomerAddress.objects.all()

class ProductRatingViewSet(viewsets.ModelViewSet):
    serializer_class=serializers.ProductRatingSerializer
    queryset=models.ProductRating.objects.all()

class CategoryList(generics.ListCreateAPIView):
    queryset = models.ProductCategory.objects.all()
    serializer_class = serializers.CategorySerializer

class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.ProductCategory.objects.all()
    serializer_class = serializers.CategoryDetailSerializer


from .serializers import ProductListSerializer
from .models import Product
class LatestProductsView(generics.ListAPIView):
    serializer_class = ProductListSerializer

    def get_queryset(self):
        return Product.objects.order_by('-created_at')[:10]  # latest 10 products