from rest_framework import viewsets, permissions
from funds.models import Funds
from .serializers import FundsSerializer


# Funds Viewset, creates CRUD
class FundsViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = FundsSerializer

    # get data from the respective user
    def get_queryset(self):
        return self.request.user.funds.all()

    # allow saving of owner information
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
