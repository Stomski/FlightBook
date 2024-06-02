from sqlalchemy.orm import relationship
from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Flight(db.Model):
    __tablename__= 'flights'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE"), nullable=False
    )
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

    pilot = db.relationship('User', back_populates = "flights")
    comments = db.relationship('Flight', back_populates = "flight", cascade="all, delete-orphan")
    # comments = db.relationship("Comment", back_populates="creator", cascade="all, delete-orphan")

    # creator = relationship("User", back_populates='servers')
