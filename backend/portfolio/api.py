from rest_framework import viewsets, permissions
from portfolio.models import Portfolio
from .serializers import PortfolioSerializer


# Portfolio Viewset, creates CRUD
class PortfolioViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = PortfolioSerializer

    # get data from the respective user
    def get_queryset(self):
        return self.request.user.portfolio.all()

    # allow saving of owner information
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
