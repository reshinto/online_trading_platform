from rest_framework import viewsets, permissions
from portfolio.models import Portfolio
from .serializers import PortfolioSerializer


# Portfolio Viewset, creates CRUD
class PortfolioViewSet(viewsets.ModelViewSet):
    queryset = Portfolio.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = PortfolioSerializer
