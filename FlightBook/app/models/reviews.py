from sqlalchemy.orm import relationship
from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Review(db.Model):
    __tablename__= 'reviews'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    creator_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE"), nullable=False
    )
    review = db.Column(db.String(2000), nullable = False)
    site_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("sites.id"), ondelete="CASCADE"), nullable=False
    )
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)


    creator = db.relationship('User', back_populates = "reviews")
    site = db.relationship('Site', back_populates = "reviews")
