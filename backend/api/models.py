from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Seller(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    address = models.TextField(null = True)

    def __str__(self):
        return self.user.username

class ProductCategory(models.Model):
    title = models.CharField(max_length=200)
    detail = models.TextField(null=True)

    def __str__(self):
        return self.title 

class Product(models.Model):
    category = models.ForeignKey(ProductCategory,on_delete=models.SET_NULL,null=True,related_name='category_product')
    seller = models.ForeignKey(Seller,on_delete=models.SET_NULL,null=True)
    title = models.CharField(max_length=200)
    slug = models.CharField(max_length=300,unique=True,null=True)
    detail = models.TextField(null=True)
    price = models.FloatField()
    tags = models.TextField(null=True)
    image = models.ImageField(upload_to='product_imgs/',null=True)

    def __str__(self):
        return self.title    
    
    @property
    def tag_list(self):
        if self.tags:
            return self.tags.split(',')
        return []  # Return an empty list if tags is None
    
class Customer(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    mobile = models.PositiveBigIntegerField()

    def __str__(self):
        return self.user.username

class Order(models.Model):
    customer = models.ForeignKey(Customer,on_delete=models.CASCADE,related_name='customer_orders')
    order_time = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return '%s' % (self.order_time)

class OrderItems(models.Model):
    order = models.ForeignKey(Order,on_delete=models.CASCADE,related_name='order_items')
    product = models.ForeignKey(Product,on_delete=models.CASCADE)

    def __str__(self):
        return self.product.title
    
class CustomerAddress(models.Model):
    customer = models.ForeignKey(Customer,on_delete=models.CASCADE,related_name='customer_address')
    address = models.TextField()
    default_address = models.BooleanField(default=False)

    def __str__(self):
        return self.address
    
class ProductRating(models.Model):
    customer = models.ForeignKey(Customer,on_delete=models.CASCADE,related_name='rating_customers')
    product = models.ForeignKey(Product,on_delete=models.CASCADE,related_name='product_ratings')
    ratings = models.IntegerField()
    reviews = models.TextField()
    add_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.ratings} - {self.reviews}'
    
class ProductImage(models.Model):
    product = models.ForeignKey(Product,on_delete=models.CASCADE,related_name='product_imgs')
    image = models.ImageField(upload_to='product_imgs/',null=True)

    def __str__(self):
        return self.image.url