from rest_framework import serializers
from .models import TeamMember, Partner, Initiative, Event


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
