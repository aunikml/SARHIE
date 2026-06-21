from django.contrib import admin
from .models import (
    HeroContent, AboutContent, Highlight,
    TeamMember, Partner, Initiative, Event,
)


class HighlightInline(admin.TabularInline):
    model = Highlight
    extra = 1
    fields = ["label", "value", "icon_name", "order"]


@admin.register(HeroContent)
class HeroContentAdmin(admin.ModelAdmin):
    list_display = ["acronym", "tagline"]
    fieldsets = [
        ("Hero Section", {"fields": ["acronym", "tagline", "description"]}),
        ("Primary CTA", {"fields": ["cta_primary_label", "cta_primary_target"]}),
        ("Secondary CTA", {"fields": ["cta_secondary_label", "cta_secondary_target"]}),
    ]


@admin.register(AboutContent)
class AboutContentAdmin(admin.ModelAdmin):
    list_display = ["title"]
    inlines = [HighlightInline]


@admin.register(Highlight)
class HighlightAdmin(admin.ModelAdmin):
    list_display = ["label", "value", "order"]
    list_editable = ["order"]


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ["name", "title", "affiliation", "order"]
    list_editable = ["order"]
    search_fields = ["name", "title", "affiliation"]


@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ["name", "order"]
    list_editable = ["order"]
    search_fields = ["name"]


@admin.register(Initiative)
class InitiativeAdmin(admin.ModelAdmin):
    list_display = ["title", "order"]
    list_editable = ["order"]


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ["title", "date"]
    list_filter = ["date"]
