from django.contrib import admin

from payments.models import LipaNaMpesaOnline

class LipaNaMpesaOnlineAdmin(admin.ModelAdmin):
    list_display = (
        'user', 'MerchantRequestID', 'CheckoutRequestID', 'ResultCode', 'Amount',
        'MpesaReceiptNumber', 'TransactionDate', 'PhoneNumber',)
    list_filter = ('PhoneNumber',)
    search_fields = ('PhoneNumber', 'MpesaReceiptNumber')

admin.site.register(LipaNaMpesaOnline, LipaNaMpesaOnlineAdmin)

