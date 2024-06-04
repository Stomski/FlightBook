from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Flight
from ..forms.create_flight import FlightCreateForm

flight_routes = Blueprint('flights', __name__)


@flight_routes.route('/by-user/<int:user_id>')
def flights_by_user(user_id):
    """
    this route will return all flights for a given user
    """
    flights = Flight.query.filter(Flight.user_id ==user_id).all()
    print(flights)
    flights_dict={}
    for flight in flights:
        flight_to_dict = flight.to_dict()
        flights_dict[flight_to_dict['id']]=flight_to_dict

    return flights_dict

@flight_routes.route('/by-site/<int:site_id>')
def flights_by_site(site_id):
    """
    this route returns all flights at a given site
    """
    flights = Flight.query.filter(Flight.site_id ==site_id).all()
    flights_dict={}
    for flight in flights:
        flight_to_dict = flight.to_dict()
        flights_dict[flight_to_dict['id']]=flight_to_dict

    return flights_dict


@flight_routes.route('/new', methods=["POST"])
def create_flight():
    """
    this route creates a new flight in the DB from a flight OBJ,
    it returns the made flight as a dict
    """
    form = FlightCreateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data, "FORM DATA IN CREATE FLIGHT THUNK $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")




    print(flight_obj)
    return {'message':'in progress, ROUTE INCOMPLETE'}
