from sqlalchemy.orm import relationship
from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Site(db.Model):
    __tablename__= 'sites'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    creator_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE"), nullable=False
    )
    name = db.Column(db.String(200), nullable = False)
    lat = db.Column(db.Integer, nullable = False)
    lon = db.Column(db.Integer,nullable = False)
    altitude =  db.Column(db.Integer, nullable=False)
    intro = db.Column(db.String(1029), nullable = False)
    official = db.Column(db.Boolean, nullable= False)

    license_required=db.Column(db.Integer)
    site_photo = db.Column(db.String(264))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)



    creator = db.relationship('User', back_populates = "sites")
    reviews = db.relationship('Review', back_populates = "site", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "creator_id": self.creator_id,
            "name": self.name,
            "lat": self.lat,
            "lon": self.lon,
            "altitude": self.altitude,
            "intro": self.intro,
            "official": self.official,
            "license_required": self.license_required,
            "site_photo": self.site_photo,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
