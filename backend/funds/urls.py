from rest_framework import routers
from .api import FundsViewSet


router = routers.DefaultRouter()
router.register('api/funds', FundsViewSet, 'funds')

urlpatterns = router.urls
