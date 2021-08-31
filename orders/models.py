import uuid

from django.contrib.auth import get_user_model
from django.template.defaultfilters import slugify
from django.utils.translation import ugettext_lazy as _

from django.db import models

User = get_user_model()
# Create your models here.
class Order(models.Model):

    _id = models.UUIDField(default=uuid.uuid4, editable=False)

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True,)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    slug = models.SlugField(primary_key=True, editable=False, max_length=255)
    

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)




    class Meta:
        db_table = 'orders'

    def __str__(self):
        return str(self.user)

    def getOrderSlug(self):
        return f'{self.user} {self.paymentMethod} {self.totalPrice} {self._id}'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.getOrderSlug())
        return super().save(*args, **kwargs)
    
    


