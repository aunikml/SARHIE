import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from api.models import (
    HeroContent, AboutContent, Highlight,
    TeamMember, Partner, Initiative, Event,
)
from django.contrib.auth.models import User

if not User.objects.filter(username="admin").exists():
    User.objects.create_superuser("admin", "admin@example.com", "admin123")

# --- Hero ---
HeroContent.objects.all().delete()
hero = HeroContent.objects.create(
    acronym="SARHIE",
    tagline="The South Asia Research Hub for Inclusive Education",
    description="Forging collaboration on school and teacher education across South Asia \u2014 a collective of academics, practitioners, and policy-makers.",
    cta_primary_label="Learn More",
    cta_primary_target="about",
    cta_secondary_label="Meet the Team",
    cta_secondary_target="team",
)

# --- About ---
AboutContent.objects.all().delete()
Highlight.objects.all().delete()
about = AboutContent.objects.create(
    title="About SARHIE",
    description="The South Asia Research Hub for Inclusive Education seeks to forge and take forward collaboration on school and teacher education within the region. The research hub is a collective bringing together academics, practitioners and policy-makers working on inclusive education from the region.",
)
Highlight.objects.create(about=about, label="Founding Members", value="9", icon_name="Groups", order=1)
Highlight.objects.create(about=about, label="Partner Institutions", value="7+", icon_name="School", order=2)
Highlight.objects.create(about=about, label="Countries", value="5", icon_name="Public", order=3)

# --- Team ---
TeamMember.objects.all().delete()
members = [
    TeamMember(
        name="Prof. Mythili Ramchand",
        title="Professor",
        affiliation="National Institute of Advanced Studies, Bengaluru",
        bio="Prof. Mythili Ramchand is currently with the National Institute of Advanced Studies, Bengaluru. Until 2024, she worked at the Tata Institute of Social Sciences. Her research interests are inclusion and teacher education. Mythili has helmed many collaborative projects and research studies. In the last five years, she led a comparative study of initial teacher education in the BRICS countries in partnership with the University of Sussex. As part of a Global South partnership, she supported an inclusive STEM teacher education programme in Nigeria, Tanzania and Bhutan. She recently completed a research project on professional development for inclusive education in India.",
        order=1,
    ),
    TeamMember(
        name="Archana Mehendale",
        title="Adjunct Professor",
        affiliation="National Institute of Advanced Studies, Bengaluru, India",
        bio="Archana Mehendale is an Adjunct Professor at the National Institute of Advanced Studies, Bengaluru, India. Prior to this, she has worked with Tata Institute of Social Sciences, Mumbai, and the Centre for Child and the Law, National Law School of India University, Bengaluru. Her research interests lie in the following areas: right to education, child labour, and inclusive education.",
        order=2,
    ),
    TeamMember(
        name="Sonia Sawhney",
        title="Assistant Professor",
        affiliation="TISS Hyderabad",
        bio="Sonia Sawhney is an Assistant Professor at TISS Hyderabad, specialising in inclusive education, equity, and child well-being, with extensive experience in research, teaching, and leading large-scale teacher development initiatives.",
        order=3,
    ),
    TeamMember(
        name="Rinchen Dorji",
        title="Pro-Vice Chancellor, Academic and Research",
        affiliation="Royal University of Bhutan",
        bio="Rinchen Dorji is the Pro-Vice Chancellor, Academic and Research at the Royal University of Bhutan. With over 30 years in education, he recently served as President of Samtse College of Education. He holds a PhD and advanced degrees from Australia, UK and Canada with specialisation in inclusive education.",
        order=4,
    ),
    TeamMember(
        name="Rebat Kumar Dhakal",
        title="Assistant Professor & Head of Educational Leadership",
        affiliation="School of Education, Kathmandu University",
        bio="Rebat is an Assistant Professor and Head of the Department of Educational Leadership at the School of Education, Kathmandu University. He also serves as the UNESCO Co-Chair in Teacher Education in Nepal. With over 15 years of experience in academic leadership and collaborative research, he has led and contributed to several international initiatives, including Erasmus+ and Transnational Education (TNE) projects on inclusive teacher education. His work spans partnerships with governments, universities, and development organizations, focusing on advancing educational policy and practice in the Global South.",
        order=5,
    ),
    TeamMember(
        name="Prof. Manjula Vithanapathirana",
        title="Chair Professor of Educational Psychology",
        affiliation="University of Colombo, Sri Lanka",
        bio="Manjula Vithanapathirana is a Chair Professor of Educational Psychology, University of Colombo, Sri Lanka, with four decades of experience in Education. Her doctorate is from University College London. She has significant experience in participating in international research projects.",
        order=6,
    ),
    TeamMember(
        name="Manjuma Akhtar Mousumi",
        title="Assistant Professor",
        affiliation="CICE, The IDEC Institute, Hiroshima University, Japan",
        bio="Manjuma Akhtar Mousumi is Assistant Professor at the Centre for the Study of International Cooperation in Education (CICE), The IDEC Institute, Hiroshima University, Japan. Prior to this, she worked as an Associate Professor & Head of Academics at the BRAC Institute of Educational Development, BRAC University, Dhaka, Bangladesh. Her research focuses on education, development, social equity, and social justice, with particular attention to minority and marginalised communities.",
        order=7,
    ),
    TeamMember(
        name="Karma Jigyel, PhD",
        title="Assistant Professor",
        affiliation="Royal University of Bhutan, Paro College of Education",
        bio="Karma Jigyel, PhD is an Assistant Professor at the Royal University of Bhutan's Paro College of Education, with over 25 years of experience. He led the launch of Bhutan's first Master of Education in Inclusive Education in 2020 and has coordinated several national and international projects in special and inclusive education.",
        order=8,
    ),
    TeamMember(
        name="Karma Lhamo",
        title="Lecturer",
        affiliation="Paro College of Education, Royal University of Bhutan",
        bio="Karma Lhamo, a lecturer with a Master of Education in Special Education with 24 years of teaching experiences. One of the members to launch the Master of Education in Inclusive Education at Paro College of Education which was headed by Dr. Jigyel. Eleven years of teaching children with disabilities in a middle school in Bhutan. First group of teachers to initiate inclusive education in mainstream schools in 2008.",
        order=9,
    ),
]
TeamMember.objects.bulk_create(members)

# --- Partners ---
Partner.objects.all().delete()
partners = [
    Partner(name="Royal University of Bhutan", order=1),
    Partner(name="Tata Institute of Social Sciences, India", order=2),
    Partner(name="National Institute of Advanced Studies, India", order=3),
    Partner(name="Kathmandu University, Nepal", order=4),
    Partner(name="University of Colombo, Sri Lanka", order=5),
    Partner(name="Center for the Study of International Cooperation in Education (CICE)", order=6),
    Partner(name="The IDEC Institute, Hiroshima University", order=7),
]
Partner.objects.bulk_create(partners)

# --- Initiatives ---
Initiative.objects.all().delete()
initiatives = [
    Initiative(
        title="Online Certificate Course",
        description="An online certificate course for educators in the South Asian region, focusing on inclusive education practices and policies.",
        icon="School",
        order=1,
    ),
    Initiative(
        title="Collaborative Writing Initiatives",
        description="Members collaborate on research and writing, bringing together experiences and promising practices related to teacher education, school education and policies for inclusion.",
        icon="Groups",
        order=2,
    ),
    Initiative(
        title="Webinars & Research Sharing",
        description="The hub convenes webinars and research-sharing sessions occasionally, fostering dialogue among academics, practitioners and policy-makers.",
        icon="RecordVoiceOver",
        order=3,
    ),
]
Initiative.objects.bulk_create(initiatives)

print("Database seeded successfully!")
