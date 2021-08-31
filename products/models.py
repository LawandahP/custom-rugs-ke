from django.db.models.base import Model
from orders.models import Order
from django.template.defaultfilters import default, slugify
from django.utils.translation import ugettext_lazy as _

from django.utils.timezone import timedelta

from django.contrib.auth import get_user_model
from django.db import models

import uuid




# Create your models here.
User =  get_user_model()

county_list = (

        ('Mombasa', _('Mombasa')),
        ('Kwale', _('Kwale')),
        ('Kilifi', _('Kilifi')),
        ('Tana River', _('Tana River')),
        ('Lamu', _('Lamu')),
        ('Taita Taveta', _('Taita Taveta')),
        ('Garissa', _('Garissa')),
        ('Wajir', _('Wajir')),
        ('Mandera', _('Mandera')),
        ('Marsabit', _('Marsabit')),
        ('Isiolo', _('Isiolo')),
        ('Meru', _('Meru')),
        ('Tharaka-Nithi', _('Tharaka-Nithi')),
        ('Embu', _('Embu')),
        ('Kitui', _('Kitui')),
        ('Machakos', _('Machakos')),
        ('Makueni', _('Makueni')),
        ('Nyandarua', _('Nyandarua')),
        ('Nyeri', _('Nyeri')),
        ('Kirinyaga', _('Kirinyaga')),
        ('Muranga', _('Muranga')),
        ('Kiambu', _('Kiambu')),
        ('Turkana', _('Turkana')),
        ('West Pokot', _('West Pokot')),
        ('Samburu', _('Samburu')),
        ('Uasin Gishu', _('Uasin Gishu')),
        ('Trans Nzoia', _('Trans Nzoia')),
        ('Elgeyo-Marakwet', _('Elgeyo-Marakwet')),
        ('Nandi', _('Nandi')),
        ('Baringo', _('Baringo')),
        ('Laikipia', _('Laikipia')),
        ('Nakuru', _('Nakuru')),
        ('Narok', _('Narok')),
        ('Kajiado', _('Kajiado')),
        ('Kericho', _('Kericho')),
        ('Bomet', _('Bomet')),
        ('Kakamega', _('Kakamega')),
        ('Vihiga', _('Vihiga')),
        ('Bungoma', _('Bungoma')),
        ('Busia', _('Busia')),
        ('Siaya', _('Siaya')),
        ('Kisumu', _('Kisumu')),
        ('Homa Bay', _('Homa Bay')),
        ('Migori', _('Migori')),
        ('Kisii', _('Kisii')),
        ('Nyamira', _('Nyamira')),
        ('Nairobi', _('Nairobi')),
        
    )

class Product(models.Model):
    _id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(upload_to='product/', default='staticImages/default-placeholder.jpg', null=True, blank=True)
    slug = models.SlugField(primary_key=True, editable=False, max_length=255)
    category = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True,)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True,)
    countInStock = models.IntegerField(null=True, blank=True, default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'products'
        

    def __str__(self):
        return self.name
    
    def getProductSlug(self):
        return f'{self.name} {self._id}'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.getProductSlug())
        return super().save(*args, **kwargs)

# class ProductImage(models.Model):
#     _id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
#     slug = models.SlugField(primary_key=True, editable=False, max_length=255)
#     image = models.ImageField(upload_to='product/', default='staticImages/default-placeholder.png', null=True, blank=True)
#     product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True) 

#     class Meta:
#         db_table = 'Product Images'

#     def __str__(self):
#         return self._id
    
#     def getImageSlug(self):
#         return f'{self.image} {self._id}'

#     def save(self, *args, **kwargs):
#         if not self.slug:
#             self.slug = slugify(self.getImageSlug())
#         return super().save(*args, **kwargs)


class Review(models.Model):
    _id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True) 

    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True) 
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True) 
    name = models.CharField(max_length=200, null=True, blank=True)
    slug = models.SlugField(primary_key=True, editable=False, max_length=255)
    rating = models.IntegerField(null=True, blank=True, default=0)
    reviewTitle = models.CharField(max_length=255, blank=True)
    comment = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'reviews'

    def __str__(self):
        return self.name
    
    def getReviewSlug(self):
        return f'{self.product} {self._id}'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.getReviewSlug())
        return super().save(*args, **kwargs)



class OrderItem(models.Model):
    _id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)

    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    slug = models.SlugField(primary_key=True, editable=False, max_length=255)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'orderitem'

    def __str__(self):
        return str(self.created_at)
    
    def getOrdeItemSlug(self):
        return f'{self.name} {self._id}'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.getOrdeItemSlug())
        return super().save(*args, **kwargs)

class ShippingAddress(models.Model):
    _id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)

    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank=True)
    county = models.CharField(max_length=50, choices=county_list)
    subCounty = models.CharField(max_length=200, blank=True, null=True)
    ward = models.CharField(max_length=200, blank=True, null=True)
    shippingCompany = models.CharField(max_length=200)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    slug = models.SlugField(primary_key=True, editable=False, max_length=255)

    
    def __str__(self):
        return f'{self.county}, {self.ward}'
    
    
    
    def shippingAddressSlug(self):
        return f'{self.county} {self._id}'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.shippingAddressSlug())
        return super().save(*args, **kwargs)