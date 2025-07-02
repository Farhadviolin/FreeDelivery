from rest_framework.views import APIView
from rest_framework.response import Response
from .models import LoyaltyAccount

class AddPoints(APIView):
    def post(self, request):
        amt = request.data["points"]
        acct = LoyaltyAccount.objects.get(user=request.user)
        acct.points += amt
        acct.save()
        return Response({"points": acct.points})
