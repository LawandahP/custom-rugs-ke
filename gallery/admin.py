from .models import Gallery
from django.contrib import admin


class GalleryAdmin(admin.ModelAdmin):
    list_display = (
        '_id', 'slug', 'picture', 'title',
        )
admin.site.register(Gallery, GalleryAdmin)
