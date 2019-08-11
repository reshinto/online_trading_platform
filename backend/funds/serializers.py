from rest_framework import serializers
from funds.models import Funds


# Funds Serializer
class FundsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Funds
        fields = '__all__'
