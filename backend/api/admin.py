from django.contrib import admin
from .models import TeamMember, Partner, Initiative, Event

admin.site.register(TeamMember)
admin.site.register(Partner)
admin.site.register(Initiative)
admin.site.register(Event)
