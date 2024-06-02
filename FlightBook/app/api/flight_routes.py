from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Flight

flight_routes = Blueprint('flights', __name__)


@flight_routes.route('/by-user/<int:userId>')
def test(userId):
    """
    this route will return all flights for a given user
    """
    flights = Flight.query.filter(Flight.user_id ==userId).all()
    print(flights)

    return {'message':"success"}
