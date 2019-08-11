from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Portfolio(models.Model):
    symbol = models.CharField(max_length=10)
    company = models.CharField(max_length=100)
    transaction = models.CharField(max_length=20)
    quantity = models.IntegerField()
    price = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(
        User, related_name="portfolio", on_delete=models.CASCADE, null=True)
