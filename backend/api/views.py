from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import (
    HeroContent, AboutContent, Highlight,
    TeamMember, Partner, Initiative, Event,
)
from .serializers import (
    HeroContentSerializer, AboutContentSerializer, HighlightSerializer,
    TeamMemberSerializer, PartnerSerializer, InitiativeSerializer,
    EventSerializer,
)


class HeroContentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HeroContent.objects.all()
    serializer_class = HeroContentSerializer

    @action(detail=False)
    def latest(self, request):
        hero = HeroContent.objects.first()
        if hero:
            return Response(HeroContentSerializer(hero).data)
        return Response({})


class AboutContentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AboutContent.objects.all()
    serializer_class = AboutContentSerializer

    @action(detail=False)
    def latest(self, request):
        about = AboutContent.objects.first()
        if about:
            return Response(AboutContentSerializer(about).data)
        return Response({})


class HighlightViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Highlight.objects.all()
    serializer_class = HighlightSerializer


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
