from rest_framework import viewsets
from .models import TeamMember, Partner, Initiative, Event
from .serializers import (
    TeamMemberSerializer,
    PartnerSerializer,
    InitiativeSerializer,
    EventSerializer,
)


class TeamMemberViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer


class PartnerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer


class InitiativeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Initiative.objects.all()
    serializer_class = InitiativeSerializer


class EventViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
