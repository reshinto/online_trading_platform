from rest_framework import routers
from .api import PortfolioViewSet


router = routers.DefaultRouter()
router.register('api/portfolio', PortfolioViewSet, 'portfolio')

urlpatterns = router.urls
