from sqlalchemy.orm import relationship
from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Comments(db.Model):
    __tablename__= 'comments'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    creator_id =db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(2000), nullable = False)
    flight_id = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)


    creator = db.relationship('User', back_populates = "comments")
