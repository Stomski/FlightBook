from app.models import db, Site, environment, SCHEMA
from sqlalchemy.sql import text

def seed_sites():
    sites = [
        Site(
            creator_id=1,
            name='Lookout Mountain',
            lat=397294,
            lon=-1052311,
            altitude=7077,
            intro='Located in Golden, Lookout Mountain offers stunning views and steady winds, making it a favorite among local paragliders.',
            official=True,
            license_required=0
        ),
        Site(
            creator_id=2,
            name='Boulder Mountain',
            lat=400150,
            lon=-1052705,
            altitude=5430,
            intro='Located in Boulder, Boulder Mountain is a well-known site for paragliding enthusiasts, with challenging conditions.',
            official=True,
            license_required=1
        ),
        Site(
            creator_id=3,
            name='Pikes Peak',
            lat=388409,
            lon=-1050423,
            altitude=14115,
            intro='Located near Colorado Springs, Pikes Peak offers a high-altitude launch with spectacular views, perfect for experienced paragliders.',
            official=True,
            license_required=1
        ),
        Site(
            creator_id=1,
            name='Mount Evans',
            lat=395883,
            lon=-1056438,
            altitude=14271,
            intro='Located in Idaho Springs, Mount Evans is known for its rugged terrain and provides a thrilling experience for advanced paragliders.',
            official=True,
            license_required=2
        ),
        Site(
            creator_id=2,
            name='Cheyenne Mountain',
            lat=387496,
            lon=-1048485,
            altitude=9600,
            intro='Located in Colorado Springs, Cheyenne Mountain has reliable thermals and beautiful scenery, suitable for all skill levels.',
            official=True,
            license_required=0
        ),
        Site(
            creator_id=3,
            name='Red Mountain',
            lat=385280,
            lon=-1052980,
            altitude=8475,
            intro='Located near Cañon City, Red Mountain is a favorite for its gentle slopes and consistent winds, ideal for beginners.',
            official=False,
            license_required=0
        ),
        Site(
            creator_id=1,
            name='Sunrise Ridge',
            lat=397392,
            lon=-1049903,
            altitude=5400,
            intro='Located in Denver, Sunrise Ridge provides beautiful sunrise flights with smooth air conditions.',
            official=True,
            license_required=0
        ),
        Site(
            creator_id=2,
            name='Bear Peak',
            lat=399654,
            lon=-1052922,
            altitude=8461,
            intro='Located in Boulder, Bear Peak offers an adventurous launch point with challenging thermal conditions.',
            official=False,
            license_required=1
        ),
        Site(
            creator_id=3,
            name='Mount Elbert',
            lat=391178,
            lon=-1064454,
            altitude=14440,
            intro='Located near Leadville, Mount Elbert, as the highest peak in Colorado, provides breathtaking flights for advanced pilots.',
            official=True,
            license_required=2
        ),
        Site(
            creator_id=1,
            name='Garden of the Gods',
            lat=388784,
            lon=-1048695,
            altitude=6403,
            intro='Located in Colorado Springs, this site is famous for its stunning rock formations and smooth, predictable wind conditions.',
            official=True,
            license_required=0
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
