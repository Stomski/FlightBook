from app.models import db, Site, environment, SCHEMA
from sqlalchemy.sql import text

def seed_sites():
    sites = [
        Site(
            creator_id=1,
            name='Boulder - Wonderland',
            lat=400165,
            lon=-1052828,
            altitude=5600,
            intro='First student flights to epic XC.',
            official=True,
            license_required=0  # P2 / H2 / M1
        ),
        Site(
            creator_id=2,
            name='Wolcott',
            lat=396422,
            lon=-1066886,
            altitude=7200,
            intro='Evening thermals and glassoffs.',
            official=True,
            license_required=0  # P2 / H2
        ),
        Site(
            creator_id=3,
            name='Williams Peak',
            lat=397426,
            lon=-1066804,
            altitude=8000,
            intro='Evening glassoffs with stunning Gore Range views.',
            official=True,
            license_required=1  # P2+ / H2+ / M2
        ),
        Site(
            creator_id=1,
            name='Kenosha Pass',
            lat=391003,
            lon=-1057563,
            altitude=10000,
            intro='High altitude thermals and soaring.',
            official=True,
            license_required=0  # P2 / H2 / M1
        ),
        Site(
            creator_id=2,
            name='Golden - Lookout Mountain',
            lat=397294,
            lon=-1052311,
            altitude=7077,
            intro='Popular drive-up site for advanced pilots.',
            official=True,
            license_required=3  # P4 / H4 / M2 *Sponsored
        ),
        Site(
            creator_id=3,
            name='Bellyache',
            lat=396500,
            lon=-1067453,
            altitude=7000,
            intro='Intro mountain site for morning sleds & thermals.',
            official=True,
            license_required=0  # P2 / H2 / M1
        ),
        Site(
            creator_id=1,
            name='Villa Grove',
            lat=381642,
            lon=-1061053,
            altitude=8000,
            intro='Huge mountains, huge thermals, huge XC.',
            official=True,
            license_required=1  # P2+ / H2+
        ),
        Site(
            creator_id=2,
            name='Copper Mountain',
            lat=397298,
            lon=-1061573,
            altitude=12400,
            intro='Advanced site with local guide, mostly winter.',
            official=True,
            license_required=3  # P4
        ),
        Site(
            creator_id=3,
            name='Otto\'s Ridge',
            lat=393262,
            lon=-1084373,
            altitude=6000,
            intro='Reliable ridge soaring & kiting.',
            official=True,
            license_required=1  # P2 / H2 / M2
        ),
        Site(
            creator_id=1,
            name='Peak 6',
            lat=397491,
            lon=-1060665,
            altitude=12800,
            intro='Big mountain flying popular with speedwings.',
            official=True,
            license_required=1  # P2+ / M2
        ),
        Site(
            creator_id=2,
            name='Mt. Victoria',
            lat=396070,
            lon=-1063875,
            altitude=11667,
            intro='Morning speed laps or east wind big thermals.',
            official=True,
            license_required=0  # P2
        ),
        Site(
            creator_id=3,
            name='Stovepipe',
            lat=394834,
            lon=-1090066,
            altitude=7000,
            intro='Thermic flying along the Book Cliffs.',
            official=True,
            license_required=2  # P3 / M2
        ),
        Site(
            creator_id=1,
            name='The Duck',
            lat=402975,
            lon=-1069695,
            altitude=7800,
            intro='Lakeside evening soaring flights.',
            official=True,
            license_required=2  # P3
        ),
        Site(
            creator_id=2,
            name='Loveland Pass',
            lat=397627,
            lon=-1058710,
            altitude=11990,
            intro='Light wind high alpine paradise.',
            official=True,
            license_required=2  # P3
        ),
        Site(
            creator_id=3,
            name='Mt. Herman',
            lat=390662,
            lon=-1049211,
            altitude=9063,
            intro='High altitude front range thermal paradise.',
            official=True,
            license_required=0  # P2
        ),
        Site(
            creator_id=1,
            name='Douglas Pass',
            lat=398205,
            lon=-1088072,
            altitude=8268,
            intro='High mountain XC on the western slope.',
            official=True,
            license_required=2  # P3
        ),
    ]

    db.session.add_all(sites)
    db.session.commit()

def undo_sites():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.sites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM sites"))
    db.session.commit()
