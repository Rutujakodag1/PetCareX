# from django.shortcuts import render
from rest_framework import generics,permissions,viewsets,pagination
from . import models
from . import serializers
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt 
from django.contrib.auth.models import User
from django.core.exceptions import PermissionDenied
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Customer, Seller
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from .permissions import IsSeller

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
    permission_classes = [AllowAny]

    def get_queryset(self):
        qs = super().get_queryset()
        if 'category' in self.request.GET:
            category = self.request.GET['category']
            qs = qs.filter(category__id=category)

        return qs

    # def perform_create(self, serializer):
    #     try:
    #         seller = models.Seller.objects.get(user=self.request.user)
    #         serializer.save(seller=seller)
    #     except models.Seller.DoesNotExist:
    #         raise PermissionDenied("You are not registered as a seller.")

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
def user_login(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    role = request.POST.get('role')
    user = authenticate(username=username,password=password)

    
    if user:
        if role == 'customer':
            if not Customer.objects.filter(user=user).exists():
                    return JsonResponse({'bool': False, 'msg': 'No customer account found'})
        elif role == 'seller':
                if not Seller.objects.filter(user=user).exists():
                    return JsonResponse({'bool': False, 'msg': 'No seller account found'})
        else:
            return JsonResponse({'bool': False, 'msg': 'Invalid role'})
        
        refresh = RefreshToken.for_user(user)
        msg = {
            'bool' : True,
            'username': user.username,
            'token': str(refresh.access_token),
            'refresh': str(refresh)
        }
    else:
        msg = {
            'bool' : False,
            'msg' : 'Invalid Username/Password'
        }
    return JsonResponse(msg)



@csrf_exempt
def user_register(request):
    if request.method == "POST":
        username = request.POST.get('username')
        email = request.POST.get('email')
        # mobile = request.POST.get('mobile')
        password = request.POST.get('password')
        role = request.POST.get('role')
        mobile = request.POST.get('mobile')
        address = request.POST.get('address')
        # Check if user already exists
        if not role in ['customer', 'seller']:
            return JsonResponse({'bool': False, 'msg': 'Invalid role'})

        if User.objects.filter(email=email).exists():
            return JsonResponse({'bool': False, 'msg': 'Email already registered'})
        
        if User.objects.filter(username = username).exists():
            return JsonResponse({'bool': False, 'msg':'Username already registered'})

        user = User.objects.create_user(
            username=username,
            email = email,
            # mobile = mobile,
            password = password,
            # mobile = mobile,
            # address = address
        )
        if role == 'seller':
            business_name = request.POST.get('business_name')
            bank_account = request.POST.get('bank_account')
            if not all([mobile, address, business_name]):
                return JsonResponse({'bool': False, 'msg': 'All seller fields are required'}, status=400)
            profile = models.Seller.objects.create(
                user=user,
                mobile=mobile,
                address=address,
                business_name=business_name,

                bank_account = bank_account
            )
        else:
            if not mobile:
                return JsonResponse({'bool': False, 'msg': 'Mobile is required for customer'}, status=400)

            profile = models.Customer.objects.create(
                user=user,
                mobile=mobile,
                address=address
            )

        # user.save()
        # customer = models.Customer.objects.create(
        #         user = user,
        #         # mobile = mobile
        #     )
        return JsonResponse({
                'bool': True,
                'user': user.id,
                # 'customer': customer.id
                'role' : role,
                'profile_id' : profile.id
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

# class CustomerAddressViewSet(viewsets.ModelViewSet):
#     serializer_class=serializers.CustomerAddressSerializer
#     queryset=models.CustomerAddress.objects.all()

class ProductRatingViewSet(viewsets.ModelViewSet):
    serializer_class=serializers.ProductRatingSerializer
    queryset=models.ProductRating.objects.all()

class CategoryList(generics.ListAPIView):
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
    

class SellerProductList(generics.ListCreateAPIView):
    serializer_class = serializers.ProductListSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated,IsSeller]


    def get_queryset(self):
        user = self.request.user
        if not hasattr(user, 'seller'):
            raise PermissionDenied("User is not a seller.")
        # seller = user.seller
        print("User:", self.request.user)
        print("Is authenticated:", self.request.user.is_authenticated)
        print("Has seller:", hasattr(self.request.user, 'seller'))
        return Product.objects.filter(seller=user.seller)

    def perform_create(self, serializer):
        user = self.request.user
        if not hasattr(user, 'seller'):
            raise PermissionDenied("User is not a seller.")
        serializer.save(seller=user.seller)



class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        if hasattr(user, 'seller'):
            token['seller_id'] = user.seller.id
        elif hasattr(user, 'customer'):
            token['customer_id'] = user.customer.id
        return token

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
