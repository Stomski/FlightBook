from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, timedelta

def seed_comments():
    comments = [
        Comment(
            user_id=1,
            site_id=1,  # Boulder - Wonderland
            site_name='Boulder - Wonderland',
            start_time=datetime.now() - timedelta(days=1),
            length=120,
            equipment='Ozone Rush 5',
            track_data=None,
            log='Great weather, smooth Comment over the Wonderland.',
            weather=None,
        ),
        Comment(
            user_id=2,
            site_id=2,  # Wolcott
            site_name='Wolcott',
            start_time=datetime.now() - timedelta(days=2),
            length=90,
            equipment='Gin Explorer',
            track_data=None,
            log='Beautiful evening thermals and glassoffs.',
            weather=None,
        ),
        Comment(
            user_id=2,
            site_id=1,  # Boulder - Wonderland
            site_name='Boulder - Wonderland',
            start_time=datetime.now() - timedelta(days=3),
            length=60,
            equipment='Nova Phantom',
            track_data=None,
            log='Strong thermals, great lift today.',
            weather=None,
        ),
        Comment(
            user_id=3,
            site_id=5,  # Golden - Lookout Mountain
            site_name='Golden - Lookout Mountain',
            start_time=datetime.now() - timedelta(days=4),
            length=180,
            equipment='Advance Sigma 10',
            track_data=None,
            log='Long Comment with consistent updrafts.',
            weather=None,
        ),
        Comment(
            user_id=3,
            site_id=4,  # Kenosha Pass
            site_name='Kenosha Pass',
            start_time=datetime.now() - timedelta(days=5),
            length=150,
            equipment='Skywalk Chili 4',
            track_data=None,
            log='Amazing experience, flew over the summit.',
            weather=None,
        ),
        Comment(
            user_id=1,
            site_id=6,  # Bellyache
            site_name='Bellyache',
            start_time=datetime.now() - timedelta(days=6),
            length=75,
            equipment='UP Summit XC4',
            track_data=None,
            log='Short but enjoyable Comment, great scenery.',
            weather=None,
        ),
        Comment(
            user_id=2,
            site_id=5,  # Golden - Lookout Mountain
            site_name='Golden - Lookout Mountain',
            start_time=datetime.now() - timedelta(days=7),
            length=45,
            equipment='Niviuk Artik 5',
            track_data=None,
            log='Windy but manageable, beautiful sunset.',
            weather=None,
        ),
        Comment(
            user_id=2,
            site_id=3,  # Williams Peak
            site_name='Williams Peak',
            start_time=datetime.now() - timedelta(days=8),
            length=30,
            equipment='Mac Para Eden 6',
            track_data=None,
            log='Short Comment, but great lift near the peak.',
            weather=None,
        ),
        Comment(
            user_id=3,
            site_id=9,  # Peak 6
            site_name='Peak 6',
            start_time=datetime.now() - timedelta(days=9),
            length=210,
            equipment='Ozone Delta 3',
            track_data=None,
            log='Longest Comment yet, spectacular views.',
            weather=None,
        ),
        Comment(
            user_id=1,
            site_id=10,  # Mt. Victoria
            site_name='Mt. Victoria',
            start_time=datetime.now() - timedelta(days=10),
            length=135,
            equipment='BGD Base 2',
            track_data=None,
            log='Challenging but rewarding flight over the pass.',
            weather=None,
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
