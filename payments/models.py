import uuid
from django.db import models
from django.template.defaultfilters import slugify
from django.contrib.auth import get_user_model

# Create your models here.
User = get_user_model()

class LipaNaMpesaOnline(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    MerchantRequestID = models.CharField(max_length=255, null=True, blank=True)
    CheckoutRequestID = models.CharField(max_length=255, null=True, blank=True)
    ResultCode = models.IntegerField(null=True, blank=True)
    ResultDesc = models.CharField(max_length=255, null=True, blank=True)
    Amount = models.FloatField(default=0, null=True, blank=True)
    MpesaReceiptNumber = models.CharField(max_length=255, null=True, blank=True)
    TransactionDate = models.DateTimeField(null=True, blank=True)
    PhoneNumber = models.CharField(max_length=13, null=True, blank=True)

    _id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    

    def __str__(self):
        return str(self.user)
    


