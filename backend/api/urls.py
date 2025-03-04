from django.urls import path
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('address',views.CustomerAddressViewSet)
router.register('productrating',views.ProductRatingViewSet)

urlpatterns = [
    #Seller
    path('sellers/',views.SellerList.as_view()),
    path('seller/<int:pk>/',views.SellerDetail.as_view()),
    #product
    path('products/',views.ProductList.as_view()),
    path('products/<str:tag>/',views.TagProductList.as_view()),
    path('product/<int:pk>/',views.ProductDetail.as_view()),
    path('related-products/<int:pk>/',views.RelatedProductList.as_view()),
    #product categories
    path('categories/',views.CategoryList.as_view()),
    path('category/<int:pk>/',views.CategoryDetail.as_view()),
    #Customer
    path('customers/',views.CustomerList.as_view()),
    path('customer/<int:pk>/',views.CustomerDetail.as_view()),
    path('customer/login/',views.customer_login, name='customer_login'),
    #Orders
    path('orders/',views.OrderList.as_view()),
    path('order/<int:pk>/',views.OrderDetail.as_view()),
]

urlpatterns+=router.urls