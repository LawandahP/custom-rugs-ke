from django.contrib import admin
from products.models import OrderItem, Product, Review, ShippingAddress
# Register your models here.



class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'name', 'slug', 'category', 
        'price', 'countInStock', 'rating', 'numReviews',)
    list_filter = ('category',)
    search_fields = ('name',)


admin.site.register(Product, ProductAdmin)

class ReviewAdmin(admin.ModelAdmin):
    list_display = (
        'product', 'user', 'name', 'slug', 'rating', 'reviewTitle',
        'created_at', 'updated_at',)
    list_filter = ('product',)
    search_fields = ('product',)

admin.site.register(Review, ReviewAdmin)



class OrderItemAdmin(admin.ModelAdmin):
    list_display = (
        'product', 'order', 'name', 'qty',
        'price', 'image', 'created_at',)
    list_filter = ('product',)
    search_fields = ('order',)

admin.site.register(OrderItem, OrderItemAdmin)


class ShippingAddressAdmin(admin.ModelAdmin):
    list_display = (
        'order', 'county', 'subCounty', 'shippingCompany',
        'shippingPrice', 'created_at', 'updated_at',)
    list_filter = ('county', 'ward',)
    search_fields = ('order',)

admin.site.register(ShippingAddress, ShippingAddressAdmin)


 