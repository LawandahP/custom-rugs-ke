from django.db import models
from django.template.defaultfilters import default, slugify


import uuid



class Gallery(models.Model):
    _id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    slug = models.SlugField(primary_key=True, editable=False, max_length=255)
    picture = models.ImageField(upload_to='product/', default='staticImages/default-placeholder.png', null=True, blank=True)
    title = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        db_table = 'Product Images'

    def __str__(self):
        return self.slug
    
    def getGallerySlug(self):
        return f'{self.picture} {self._id}'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.getGallerySlug())
        return super().save(*args, **kwargs)
