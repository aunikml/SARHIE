from django.db import models


class TeamMember(models.Model):
    name = models.CharField(max_length=200)
    title = models.CharField(max_length=300)
    affiliation = models.CharField(max_length=500, blank=True)
    bio = models.TextField()
    image_url = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.name


class Partner(models.Model):
    name = models.CharField(max_length=300)
    logo_url = models.URLField(blank=True)
    website_url = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.name


class Initiative(models.Model):
    title = models.CharField(max_length=300)
    description = models.TextField()
    icon = models.CharField(max_length=100, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title


class Event(models.Model):
    title = models.CharField(max_length=300)
    date = models.DateField()
    description = models.TextField(blank=True)
    link = models.URLField(blank=True)

    class Meta:
        ordering = ["-date"]

    def __str__(self):
        return self.title
