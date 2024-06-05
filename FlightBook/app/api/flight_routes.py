from flask import Blueprint, request
from flask_login import login_required
from app.models import Flight, db
from ..forms.create_flight import FlightCreateForm
from ..api.aws_functions import upload_file_to_s3, get_unique_filename

flight_routes = Blueprint('flights', __name__)

@flight_routes.route('/all')
def flights_recent():
    """
    this route will return all flights MOST RECENT AT THE TOP
    """
    flights = Flight.query.order_by(Flight.start_time.desc()).limit(20).all()
    print(flights)
    flights_dict={}
    for flight in flights:
        flight_to_dict = flight.to_dict()
        flights_dict[flight_to_dict['id']]=flight_to_dict

    return flights_dict


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
    if form.validate_on_submit():
        if form.data["flight_photo"]:
            print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> there is FLIGHT photo data")
            image = form.data["flight_photo"]
            print(image, "IMAGE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            image.filename = get_unique_filename(image.filename)
            print(image, "IMAGE")
            print(image.filename, "IMAGE>FILEMANE")
            upload = upload_file_to_s3(image)
            print(upload, "UPLOAD<<<<<<<<<<<<<<<<")

            if "url" not in upload:
                print("WHAT THE FUCK")
                return form.errors, 400
            url = upload["url"]
            flight = Flight(
                site_name=form.data['site_name'],
                start_time=form.data['start_time'],
                length = form.data["length"],
                equipment = form.data["equipment"],
                flight_photo = url,
                user_id= form.data["user_id"],
                log = form.data["log"]
            )
            db.session.add(flight)
            db.session.commit()
            return flight.to_dict()
        else:
            print("XXXXXXX#################################################### NO FLIGHT photo data")
            print(form.data)
            print("XXXXXXX#################################################### NO FLIGHT photo data")
            flight = Flight(
                site_name=form.data['site_name'],
                start_time=form.data['start_time'],
                length = form.data["length"],
                equipment = form.data["equipment"],
                log = form.data["log"],
                user_id= form.data["user_id"]
            )
            db.session.add(flight)
            db.session.commit()
            return flight.to_dict()

    return form.errors, 400
