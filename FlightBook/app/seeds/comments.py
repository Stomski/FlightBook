from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, timedelta

def seed_comments():
    comments = [
        Comment(
            creator_id=1,
            comment='GOOD job today!!',
            flight_id=1,
            created_at=datetime.now() - timedelta(days=1),
            updated_at=datetime.now() - timedelta(days=1)
        ),
        Comment(
            creator_id=2,
            comment='Really good thermalling out there!',
            flight_id=2,
            created_at=datetime.now() - timedelta(days=2),
            updated_at=datetime.now() - timedelta(days=2)
        ),
        Comment(
            creator_id=3,
            comment='Solid take off, very smooth.',
            flight_id=3,
            created_at=datetime.now() - timedelta(days=3),
            updated_at=datetime.now() - timedelta(days=3)
        ),
        Comment(
            creator_id=4,
            comment='great flying with you!!!!',
            flight_id=4,
            created_at=datetime.now() - timedelta(days=4),
            updated_at=datetime.now() - timedelta(days=4)
        ),
        Comment(
            creator_id=1,
            comment='GOOD job today!! You nailed it!',
            flight_id=5,
            created_at=datetime.now() - timedelta(days=5),
            updated_at=datetime.now() - timedelta(days=5)
        ),
        Comment(
            creator_id=2,
            comment='Really good thermalling today, impressive!',
            flight_id=6,
            created_at=datetime.now() - timedelta(days=6),
            updated_at=datetime.now() - timedelta(days=6)
        ),
        Comment(
            creator_id=3,
            comment='Solid take off and great control.',
            flight_id=7,
            created_at=datetime.now() - timedelta(days=7),
            updated_at=datetime.now() - timedelta(days=7)
        ),
        Comment(
            creator_id=4,
            comment='I got some awesome pictures of you in flight, DM me!!!',
            flight_id=8,
            created_at=datetime.now() - timedelta(days=8),
            updated_at=datetime.now() - timedelta(days=8)
        ),
        Comment(
            creator_id=1,
            comment='GOOD job today!! Loved watching you fly.',
            flight_id=9,
            created_at=datetime.now() - timedelta(days=9),
            updated_at=datetime.now() - timedelta(days=9)
        ),
        Comment(
            creator_id=2,
            comment='Challenging but rewarding experience, well done!',
            flight_id=10,
            created_at=datetime.now() - timedelta(days=10),
            updated_at=datetime.now() - timedelta(days=10)
        ),
        Comment(
            creator_id=3,
            comment='Fantastic flying conditions today, you did great!',
            flight_id=1,
            created_at=datetime.now() - timedelta(days=11),
            updated_at=datetime.now() - timedelta(days=11)
        ),
        Comment(
            creator_id=4,
            comment='Really enjoyed watching your flight, great weather.',
            flight_id=2,
            created_at=datetime.now() - timedelta(days=12),
            updated_at=datetime.now() - timedelta(days=12)
        ),
        Comment(
            creator_id=1,
            comment='The lift was amazing, you made it look easy!',
            flight_id=3,
            created_at=datetime.now() - timedelta(days=13),
            updated_at=datetime.now() - timedelta(days=13)
        ),
        Comment(
            creator_id=2,
            comment='A bit turbulent but you handled it great.',
            flight_id=4,
            created_at=datetime.now() - timedelta(days=14),
            updated_at=datetime.now() - timedelta(days=14)
        ),
        Comment(
            creator_id=3,
            comment='Great thermals today, looked like you had a blast!',
            flight_id=5,
            created_at=datetime.now() - timedelta(days=15),
            updated_at=datetime.now() - timedelta(days=15)
        ),
    ]

    db.session.add_all(comments)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))
    db.session.commit()
