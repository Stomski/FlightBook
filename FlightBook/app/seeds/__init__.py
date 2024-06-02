from flask.cli import AppGroup
from .users import seed_users, undo_users
from .sites import seed_sites, undo_sites
from .flights import seed_flights, undo_flights
from .comments import seed_comments, undo_comments
from .reviews import seed_reviews, undo_reviews
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_reviews()
        undo_comments()
        undo_sites()
        undo_flights()
        undo_users()

    seed_users()
    seed_flights()
    seed_sites()
    seed_reviews()
    seed_comments()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_reviews()
    undo_comments()
    undo_sites()
    undo_flights()
    undo_users()
    # Add other undo functions here
