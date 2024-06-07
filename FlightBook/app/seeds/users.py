from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    users = [
        User(
            username='Demo',
            first_name='Demo',
            last_name='User',
            email='demo@aa.io',
            password='password',
            user_photo = 'https://flightbook1may2024.s3.us-east-2.amazonaws.com/704484a5b6914597be69b584ae347d10.jpg'
        ),
        User(
            username='marnie',
            first_name='Marnie',
            last_name='Smith',
            email='marnie@aa.io',
            password='password',
            user_photo = 'https://flightbook1may2024.s3.us-east-2.amazonaws.com/704484a5b6914597be69b584ae347d10.jpg'
        ),
        User(
            username='bobby',
            first_name='Bobby',
            last_name='Brown',
            email='bobby@aa.io',
            password='password',
            user_photo = 'https://flightbook1may2024.s3.us-east-2.amazonaws.com/f5b638ae605342d8afe210c37d77ca8a.jpg'
        ),
        User(
            username='alice',
            first_name='Alice',
            last_name='Johnson',
            email='alice@aa.io',
                 password='password',
            user_photo = 'https://flightbook1may2024.s3.us-east-2.amazonaws.com/704484a5b6914597be69b584ae347d10.jpg'
        ),
        User(
            username='john',
            first_name='John',
            last_name='Doe',
            email='john@aa.io',
            password='password',
            user_photo = 'https://flightbook1may2024.s3.us-east-2.amazonaws.com/f5b638ae605342d8afe210c37d77ca8a.jpg'
        ),
    ]

    db.session.add_all(users)
    db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
