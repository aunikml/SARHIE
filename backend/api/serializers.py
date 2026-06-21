from rest_framework import serializers
from .models import (
    HeroContent, AboutContent, Highlight,
    TeamMember, Partner, Initiative, Event,
)


class HeroContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroContent
        fields = "__all__"


class HighlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Highlight
        fields = "__all__"


class AboutContentSerializer(serializers.ModelSerializer):
    highlights = HighlightSerializer(many=True, read_only=True)

    class Meta:
        model = AboutContent
        fields = "__all__"


class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = "__all__"


class PartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partner
        fields = "__all__"


class InitiativeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Initiative
        fields = "__all__"


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = "__all__"
