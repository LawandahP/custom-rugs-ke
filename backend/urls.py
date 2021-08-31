from django.conf import settings
from django.conf.urls.static import static

from django.contrib import admin
from django.urls import path
from django.urls.conf import include

from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),

    path('', TemplateView.as_view(template_name='index.html')),

    path('api/', include('products.urls')),
    path('api/', include('users.urls')),
    path('api/', include('orders.urls')),
    path('api/', include('gallery.urls')),
    path('api/', include('payments.urls'))
] 

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
