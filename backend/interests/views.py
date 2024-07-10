from rest_framework import generics
from .models import Interest
from .serializers import InterestSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class InterestListView(generics.ListCreateAPIView):
    queryset = Interest.objects.all()
    serializer_class = InterestSerializer
    permission_classes = [IsAuthenticated]

class AcceptRejectInterestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk, action):
        try:
            interest = Interest.objects.get(pk=pk, recipient=request.user)
            if action == 'accept':
                interest.status = 'accepted'
            elif action == 'reject':
                interest.status = 'rejected'
            interest.save()
            return Response({'status': 'success'}, status=status.HTTP_200_OK)
        except Interest.DoesNotExist:
            return Response({'error': 'Interest not found'}, status=status.HTTP_404_NOT_FOUND)
