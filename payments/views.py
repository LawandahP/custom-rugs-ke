from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny

from serializers import LipaNaMpesaOnlineSerializer
from models import LipaNaMpesaOnline


class LipaNaMpesaCallbackUrlAPIView(CreateAPIView):
    queryset = LipaNaMpesaOnline.objects.all()
    serializer_class = LipaNaMpesaOnlineSerializer
    permission_classes = [AllowAny]

    def create(self, request):
        print(request.data)
