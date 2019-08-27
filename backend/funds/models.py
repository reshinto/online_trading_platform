from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Funds(models.Model):
    transactionType = models.CharField(null=True, max_length=20)
    amount = models.FloatField(null=True)
    totalFund = models.FloatField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(
        User, related_name="funds", on_delete=models.CASCADE, null=True)

    # prevents adding of "s" default
    class Meta:
        verbose_name_plural = "funds"
