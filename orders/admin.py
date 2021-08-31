from orders.models import Order

from django.contrib import admin


class OrderAdmin(admin.ModelAdmin):
    list_display = (
        '_id','user', 'paymentMethod', 'taxPrice', 'shippingPrice',
        'totalPrice', 'slug', 'isPaid', 'paidAt', 'isDelivered', 'deliveredAt')
    list_filter = ('isPaid',)
    search_fields = ('isDelivered',)

admin.site.register(Order, OrderAdmin)



