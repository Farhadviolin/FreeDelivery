from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import DSARRequest
from .tasks import process_dsar
class DSARView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        dsar = DSARRequest.objects.create(user=request.user)
        process_dsar.delay(dsar.id)
        return Response({"status": "processing"})
