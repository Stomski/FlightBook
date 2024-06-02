from app.models import db, Flight, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, timedelta

def seed_flights():
    flights = [
        Flight(
            user_id=1,
            site_id=None,
            site_name='Telluride',
            start_time=datetime.now() - timedelta(days=1),
            length=120,
            equipment='Ozone Rush 5',
            track_data=None,
            log='Great weather, smooth flight over the San Juans.',
            weather=None,
        ),
        Flight(
            user_id=1,
            site_id=None,
            site_name='Aspen Mountain',
            start_time=datetime.now() - timedelta(days=2),
            length=90,
            equipment='Gin Explorer',
            track_data=None,
            log='Beautiful views of the Elk Mountains.',
            weather=None,
        ),
        Flight(
            user_id=2,
            site_id=None,
            site_name='Boulder',
            start_time=datetime.now() - timedelta(days=3),
            length=60,
            equipment='Nova Phantom',
            track_data=None,
            log='Strong thermals, great lift today.',
            weather=None,
        ),
        Flight(
            user_id=2,
            site_id=None,
            site_name='Lookout Mountain',
            start_time=datetime.now() - timedelta(days=4),
            length=180,
            equipment='Advance Sigma 10',
            track_data=None,
            log='Long flight with consistent updrafts.',
            weather=None,
        ),
        Flight(
            user_id=3,
            site_id=None,
            site_name='Pikes Peak',
            start_time=datetime.now() - timedelta(days=5),
            length=150,
            equipment='Skywalk Chili 4',
            track_data=None,
            log='Amazing experience, flew over the summit.',
            weather=None,
        ),
        Flight(
            user_id=3,
            site_id=None,
            site_name='Red Rocks',
            start_time=datetime.now() - timedelta(days=6),
            length=75,
            equipment='UP Summit XC4',
            track_data=None,
            log='Short but enjoyable flight, great scenery.',
            weather=None,
        ),
        Flight(
            user_id=1,
            site_id=None,
            site_name='Golden',
            start_time=datetime.now() - timedelta(days=7),
            length=45,
            equipment='Niviuk Artik 5',
            track_data=None,
            log='Windy but manageable, beautiful sunset.',
            weather=None,
        ),
        Flight(
            user_id=2,
            site_id=None,
            site_name='Mount Princeton',
            start_time=datetime.now() - timedelta(days=8),
            length=30,
            equipment='Mac Para Eden 6',
            track_data=None,
            log='Short flight, but great lift near the peak.',
            weather=None,
        ),
        Flight(
            user_id=3,
            site_id=None,
            site_name='Crested Butte',
            start_time=datetime.now() - timedelta(days=9),
            length=210,
            equipment='Ozone Delta 3',
            track_data=None,
            log='Longest flight yet, spectacular views.',
            weather=None,
        ),
        Flight(
            user_id=1,
            site_id=None,
            site_name='Monarch Pass',
            start_time=datetime.now() - timedelta(days=10),
            length=135,
            equipment='BGD Base 2',
            track_data=None,
            log='Challenging but rewarding flight over the pass.',
            weather=None,
        ),
    ]

    db.session.add_all(flights)
    db.session.commit()

def undo_flights():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.flights RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM flights"))
    db.session.commit()
