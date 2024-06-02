from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, timedelta

def seed_reviews():
    reviews = [
        Review(
            creator_id=1,
            review='This is a beautiful zone, easy approach and large landing zone.',
            site_id=1,
            created_at=datetime.now() - timedelta(days=1),
            updated_at=datetime.now() - timedelta(days=1)
        ),
        Review(
            creator_id=2,
            review='Evening flights here are breathtaking. Highly recommend!',
            site_id=2,
            created_at=datetime.now() - timedelta(days=2),
            updated_at=datetime.now() - timedelta(days=2)
        ),
        Review(
            creator_id=3,
            review='Stunning views of the Gore Range, especially during glassoff.',
            site_id=3,
            created_at=datetime.now() - timedelta(days=3),
            updated_at=datetime.now() - timedelta(days=3)
        ),
        Review(
            creator_id=1,
            review='High altitude thermals make for an exhilarating experience.',
            site_id=4,
            created_at=datetime.now() - timedelta(days=4),
            updated_at=datetime.now() - timedelta(days=4)
        ),
        Review(
            creator_id=2,
            review='Perfect for advanced pilots. Consistent updrafts.',
            site_id=5,
            created_at=datetime.now() - timedelta(days=5),
            updated_at=datetime.now() - timedelta(days=5)
        ),
        Review(
            creator_id=3,
            review='Great intro mountain site, ideal for morning flights.',
            site_id=6,
            created_at=datetime.now() - timedelta(days=6),
            updated_at=datetime.now() - timedelta(days=6)
        ),
        Review(
            creator_id=1,
            review='Huge thermals and XC potential. A must-fly location!',
            site_id=7,
            created_at=datetime.now() - timedelta(days=7),
            updated_at=datetime.now() - timedelta(days=7)
        ),
        Review(
            creator_id=2,
            review='Requires a local guide, but the winter flights are worth it.',
            site_id=8,
            created_at=datetime.now() - timedelta(days=8),
            updated_at=datetime.now() - timedelta(days=8)
        ),
        Review(
            creator_id=3,
            review='Reliable ridge soaring and kiting. Had a fantastic time!',
            site_id=9,
            created_at=datetime.now() - timedelta(days=9),
            updated_at=datetime.now() - timedelta(days=9)
        ),
        Review(
            creator_id=1,
            review='Popular with speedwings. Challenging but rewarding.',
            site_id=10,
            created_at=datetime.now() - timedelta(days=10),
            updated_at=datetime.now() - timedelta(days=10)
        ),
        Review(
            creator_id=2,
            review='Morning speed laps or east wind thermals. Great spot!',
            site_id=11,
            created_at=datetime.now() - timedelta(days=11),
            updated_at=datetime.now() - timedelta(days=11)
        ),
        Review(
            creator_id=3,
            review='Flying along the Book Cliffs is always a thrill.',
            site_id=12,
            created_at=datetime.now() - timedelta(days=12),
            updated_at=datetime.now() - timedelta(days=12)
        ),
        Review(
            creator_id=1,
            review='Evening soaring over the lake is magical.',
            site_id=13,
            created_at=datetime.now() - timedelta(days=13),
            updated_at=datetime.now() - timedelta(days=13)
        ),
        Review(
            creator_id=2,
            review='Light wind high alpine paradise. Can’t beat it!',
            site_id=14,
            created_at=datetime.now() - timedelta(days=14),
            updated_at=datetime.now() - timedelta(days=14)
        ),
        Review(
            creator_id=3,
            review='High altitude thermals at their best. A front range gem.',
            site_id=15,
            created_at=datetime.now() - timedelta(days=15),
            updated_at=datetime.now() - timedelta(days=15)
        ),
        Review(
            creator_id=1,
            review='Western slope XC heaven. Incredible experience!',
            site_id=16,
            created_at=datetime.now() - timedelta(days=16),
            updated_at=datetime.now() - timedelta(days=16)
        ),
    ]

    db.session.add_all(reviews)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
    db.session.commit()
