from app.models import db, Flight, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, timedelta

def seed_flights():
    flights = [
        Flight(
            user_id=1,
            site_id=1,  # Boulder - Wonderland
            site_name='Boulder - Wonderland',
            start_time=datetime.now() - timedelta(days=1),
            length=120,
            equipment='Ozone Rush 5',
            track_data=None,
            log='Great weather, smooth flight over the Wonderland.',
            weather=None,
            flight_photo="https://res.cloudinary.com/dvnr49gnx/image/upload/v1717996132/IMG_1887_g5wpts.jpg",
        ),
        Flight(
            user_id=2,
            site_id=2,  # Wolcott
            site_name='Wolcott',
            start_time=datetime.now() - timedelta(days=2),
            length=90,
            equipment='Gin Explorer',
            track_data=None,
            log='Beautiful evening thermals and glassoffs.',
            weather=None,
            flight_photo="https://res.cloudinary.com/dvnr49gnx/image/upload/v1717995946/IMG_6648_pphute.jpg"),
        Flight(
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
        Flight(
            user_id=3,
            site_id=5,  # Golden - Lookout Mountain
            site_name='Golden - Lookout Mountain',
            start_time=datetime.now() - timedelta(days=4),
            length=180,
            equipment='Advance Sigma 10',
            track_data=None,
            log='Long flight with consistent updrafts.',
            weather=None,
            flight_photo="https://res.cloudinary.com/dvnr49gnx/image/upload/v1717995950/IMG_3C312DC85957-1_iit4ek.jpg"
        ),
        Flight(
            user_id=3,
            site_id=4,  # Kenosha Pass
            site_name='Kenosha Pass',
            start_time=datetime.now() - timedelta(days=5),
            length=150,
            equipment='Skywalk Chili 4',
            track_data=None,
            log='Amazing experience, flew over the summit.',
            weather=None,
            flight_photo="https://res.cloudinary.com/dvnr49gnx/image/upload/v1717995924/IMG_6657_jqbav6.jpg"
        ),
        Flight(
            user_id=1,
            site_id=6,  # Bellyache
            site_name='Bellyache',
            start_time=datetime.now() - timedelta(days=6),
            length=75,
            equipment='UP Summit XC4',
            track_data=None,
            log='Short but enjoyable flight, great scenery.',
            weather=None,
        ),
        Flight(
            user_id=2,
            site_id=5,  # Golden - Lookout Mountain
            site_name='Golden - Lookout Mountain',
            start_time=datetime.now() - timedelta(days=7),
            length=45,
            equipment='Niviuk Artik 5',
            track_data=None,
            log='Windy but manageable, beautiful sunset.',
            weather=None,
            flight_photo="https://res.cloudinary.com/dvnr49gnx/image/upload/v1717995924/IMG_FDEE7AE5342A-1_d4objp.jpg"
        ),
        Flight(
            user_id=2,
            site_id=3,  # Williams Peak
            site_name='Williams Peak',
            start_time=datetime.now() - timedelta(days=8),
            length=30,
            equipment='Mac Para Eden 6',
            track_data=None,
            log='Short flight, but great lift near the peak.',
            weather=None,
            flight_photo="https://res.cloudinary.com/dvnr49gnx/image/upload/v1717996060/IMG_5200_qpe7oz.png"
        ),
        Flight(
            user_id=3,
            site_id=9,  # Peak 6
            site_name='Peak 6',
            start_time=datetime.now() - timedelta(days=9),
            length=210,
            equipment='Ozone Delta 3',
            track_data=None,
            log='Longest flight yet, spectacular views.',
            weather=None,
            flight_photo="https://res.cloudinary.com/dvnr49gnx/image/upload/v1717996132/IMG_1887_g5wpts.jpg"
        ),
        Flight(
            user_id=1,
            site_id=10,  # Mt. Victoria
            site_name='Mt. Victoria',
            start_time=datetime.now() - timedelta(days=10),
            length=135,
            equipment='BGD Base 2',
            track_data=None,
            log='Challenging but rewarding flight over the pass.',
            weather=None,
            flight_photo="https://res.cloudinary.com/dvnr49gnx/image/upload/v1717995927/GPTempDownload_tlsubv.jpg"
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
