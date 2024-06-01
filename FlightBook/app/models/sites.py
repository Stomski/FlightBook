from sqlalchemy.orm import relationship
from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Site(db.Model):
    __tablename__= 'sites'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    creator_id =db.Column(db.Integer)
    name = db.Column(db.String(200), nullable = False)
    lat = db.Column(db.Integer, nullable = False)
    lon = db.Column(db.Integer,nullable = False)
    altitude =  db.Column(db.Integer, nullable=False)
    intro = db.Column(db.String(1029), nullable = False)
    official = db.Column(db.Boolean, nullable= False)
    license_required=db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)



    creator = db.relationship('User', back_populates = "sites")
