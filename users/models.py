from django.db import models

from django.template.defaultfilters import default, slugify
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import (BaseUserManager,
                                        AbstractBaseUser, PermissionsMixin)

from phonenumber_field.modelfields import PhoneNumberField
from PIL import Image

import uuid


class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError("User must have an email")
        if not password:
            raise ValueError("User must have a password")

        user = self.model(
            email=self.normalize_email(email)
        )
     
        user.set_password(password)  # change password to hash
        user.is_admin = False
        user.is_staff = False
        user.is_tenant = False
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None):
        if not email:
            raise ValueError("User must have an email")
        if not password:
            raise ValueError("User must have a password")
      

        user = self.create_user(
            email=email,
            password=password
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser, PermissionsMixin):
    _id = models.UUIDField(default=uuid.uuid4, editable=False)

    email = models.EmailField(unique=True)
    first_name  = models.CharField(max_length=255)
    last_name  = models.CharField(max_length=255)
    phone_number = PhoneNumberField(unique=True, region='KE', blank=True, null=True)
    slug = models.SlugField(max_length=255)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateField(auto_now_add=True)

    

    USERNAME_FIELD = 'email'
    # REQUIRED_FIELDS = ['username',]

    objects = UserManager()

    class Meta:
        db_table = 'users'

    def __str__(self):
        return f'{self.first_name} {self.last_name}'
    
    def getUserSlug(self):
        return f'{self.first_name} {self.last_name} {self._id}'
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.getUserSlug())
        return super().save(*args, **kwargs)
