from django.db import models


class HeroContent(models.Model):
    acronym = models.CharField(max_length=20, default="SARHIE")
    tagline = models.CharField(max_length=300, default="The South Asia Research Hub for Inclusive Education")
    description = models.TextField(blank=True)
    cta_primary_label = models.CharField(max_length=100, default="Learn More")
    cta_primary_target = models.CharField(max_length=100, default="about")
    cta_secondary_label = models.CharField(max_length=100, default="Meet the Team")
    cta_secondary_target = models.CharField(max_length=100, default="team")

    class Meta:
        verbose_name = "Hero Content"
        verbose_name_plural = "Hero Content"

    def __str__(self):
        return self.acronym


class AboutContent(models.Model):
    title = models.CharField(max_length=200, default="About SARHIE")
    description = models.TextField()

    class Meta:
        verbose_name = "About Content"
        verbose_name_plural = "About Content"

    def __str__(self):
        return self.title


class Highlight(models.Model):
    about = models.ForeignKey(AboutContent, on_delete=models.CASCADE, related_name="highlights")
    label = models.CharField(max_length=200)
    value = models.CharField(max_length=50)
    icon_name = models.CharField(max_length=100, blank=True, help_text="MUI icon name (e.g. Groups, School, Public)")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.label}: {self.value}"


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
