from sqlalchemy.orm import relationship
from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Site(db.Model):
    __tablename__= 'sites'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    creator_id =db.Column(db.Integer, nullable=False)
    site_id = db.Column(db.Integer)
    site_name = db.Column(db.String(200), nullable = False)
    start_time = db.Column(db.DateTime, nullable =  False)
    length = db.Column(db.Integer)
    equipment = db.Column(db.String(500))
    track_data=db.Column(db.String(255))
    log = db.Column(db.String(1017))
    weather = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

""""
Table Sites {
  id int PK
  name string
  lat string
  lon string
  altitude int
  intro string
  license_level int
  user_Id int
  official boolean
}


"""
