from users.models import CustomUser
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

class UserAdmin(BaseUserAdmin):
    list_display = ('_id', 'first_name', 'last_name', 'email', 'phone_number', 'is_staff',)
    list_filter = ('is_admin', 'is_staff', 'is_superuser',)
    fieldsets = (
        (None, {'fields': ('first_name', 'last_name', 'email', 'phone_number',)}),
        ('Permissions', {'fields': ('is_admin', 'is_staff', 'is_superuser',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('first_name', 'last_name', 'email',
                        'phone_number', 'password1', 'password2'),
        }),
    )
    # prepopulated_fields = {'slug': ('first_name', 'last_name',)}
    search_fields = ('first_name',)
    ordering = ('created_at',)
    filter_horizontal = ()


admin.site.register(CustomUser, UserAdmin)
