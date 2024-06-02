from app.models import db, Site, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, timedelta

def seed_sites():
    sites = [
        Site(

        ),
        Site(

        ),
        Site(

        ),
        Site(

        ),
        Site(

        ),
        Site(

        ),
        Site(

        ),
        Site(

        ),
        Site(

        ),
        Site(

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
