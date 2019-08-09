from rest_framework import serializers
from portfolio.models import Portfolio


# Portfolio Serializer
class PortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Portfolio
        fields = '__all__'
