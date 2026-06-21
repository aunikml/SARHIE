from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TeamMemberViewSet, PartnerViewSet, InitiativeViewSet, EventViewSet

router = DefaultRouter()
router.register(r"team-members", TeamMemberViewSet)
router.register(r"partners", PartnerViewSet)
router.register(r"initiatives", InitiativeViewSet)
router.register(r"events", EventViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
