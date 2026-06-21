from rest_framework import viewsets
from rest_framework.permissions import BasePermission, SAFE_METHODS
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


class IsAuthenticatedOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        return bool(request.method in SAFE_METHODS or (request.user and request.user.is_authenticated))


class HeroContentViewSet(viewsets.ModelViewSet):
    queryset = HeroContent.objects.all()
    serializer_class = HeroContentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    @action(detail=False)
    def latest(self, request):
        hero = HeroContent.objects.first()
        if hero:
            return Response(HeroContentSerializer(hero).data)
        return Response({})


class AboutContentViewSet(viewsets.ModelViewSet):
    queryset = AboutContent.objects.all()
    serializer_class = AboutContentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    @action(detail=False)
    def latest(self, request):
        about = AboutContent.objects.first()
        if about:
            return Response(AboutContentSerializer(about).data)
        return Response({})


class HighlightViewSet(viewsets.ModelViewSet):
    queryset = Highlight.objects.all()
    serializer_class = HighlightSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class TeamMemberViewSet(viewsets.ModelViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class PartnerViewSet(viewsets.ModelViewSet):
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class InitiativeViewSet(viewsets.ModelViewSet):
    queryset = Initiative.objects.all()
    serializer_class = InitiativeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
