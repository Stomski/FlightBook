from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import Site,Review, db
from ..forms.create_site import SiteCreateForm
from ..forms.create_review import ReviewCreateForm
from ..api.aws_functions import upload_file_to_s3, get_unique_filename, remove_file_from_s3
from sqlalchemy.orm import joinedload
import os
import requests

site_routes = Blueprint('sites', __name__)


@site_routes.route('/details/<int:site_id>')
def getSiteDetails(site_id):
    """
    this route returns a very detailed view of a site
    """
    site_details = Site.query.get(site_id)

    print(site_details.to_dict())
    return site_details.to_dict()

@site_routes.route('/elevation/<float(signed=True):lat>/<float(signed=True):lon>')
def getSiteElevation(lat,lon):
    """
    this route is designed to interact with the google maps elevation api, it gets pinged when we try to create a new marker on the maps
    """
    #  const apiUrl = `https://maps.googleapis.com/maps/api/elevation/json?locations=${latitude},${longitude}&key=${apiKey}`;
    api_key=os.environ.get("VITE_GOOGLE_MAPS_API_KEY")
    print(api_key, "#########################################################################")
    print("TESTING@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", lat,lon)


    api_url = f"https://maps.googleapis.com/maps/api/elevation/json?locations={lat},{lon}&key={api_key}"


    response = requests.get(api_url)

    return(jsonify(response.json()))

@site_routes.route('reviews/<int:site_id>')
def getReviewsBySite(site_id):
    """
    this route returns dictionaries of all the reviews for a given site_id
    it also returns the creators data, the user that made the review
    """


    reviews = Review.query.options(joinedload(Review.creator)).filter_by(site_id=site_id).all()




    print('reviews',reviews)
    review_dict ={}
    for review in reviews:
        print("THIS IS MY ITERATION THROUGH THE REVIEWS>>>>>>>>>>>>", review)
        print("keying into the creator", review.creator.to_dict())
        review_creator = review.creator.to_dict()

        review_to_dict = review.to_dict()
        review_to_dict["creator"]=review_creator
        review_dict[review_to_dict["id"]]=review_to_dict
    return review_dict


site_routes.route('reviews/delete/<int:site_id>')
def deleteReviewBySite(site_id):
    """
    This route deletes the review with the given ID
    """
    print("reviews/delete/<int:site_id> ROUTE HIT")
    review = Review.query.get(site_id)
    db.session.delete(review)
    db.session.commit()
    return {"message":"successfully Delete"}



@site_routes.route('reviews/create/<int:site_id>', methods = ["POST"])
def createReviewBySite(site_id):
    """
    This route creates a new REVIEW in the database from the form data in the ReviewCreateForm,
    attached to the given site_id
    """
    print("CREATE Review route CALLED $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
    print(site_id,"site_id #################################")

    form = ReviewCreateForm()


    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data, "FORM DATA IN REVIEW CREATE ROUTE &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
    if form.validate_on_submit():
        print("form.validate on submit passed in create review route")
        review = Review(
            creator_id = form.data["creator_id"],
            site_id = form.data["site_id"],
            review = form.data["review"]
        )
        db.session.add(review)
        db.session.commit()
        return review.to_dict()

    print(form.errors, "form.errors")


    return form.errors, 400

@site_routes.route('/all')
def getAllSites():
    """
    this route returns dictionaries of all the sites in the DB
    """

    sites = Site.query.all()

    sites_dict ={}
    for site in sites:
        site_to_dict = site.to_dict()
        sites_dict[site_to_dict["id"]] = site_to_dict
    return sites_dict

@site_routes.route('/by-user/<int:user_id>')
def get_sites_by_user(user_id):
    """
    this route returns dictionaries of all the sites in the DB
    CREATED BY A GIVEN USER
    """

    sites = Site.query.filter(Site.creator_id==user_id).all()

    sites_dict ={}
    for site in sites:
        site_to_dict = site.to_dict()
        sites_dict[site_to_dict["id"]] = site_to_dict
    return sites_dict


@site_routes.route('/update/<int:site_id>', methods = ["POST"])
def update_site(site_id):
    """
    This route UPDATES AN EXISTING site in the database from the form data in the SiteCreateForm
    """
    print("CREATE SITE THUNK CALLED $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
    print(site_id)
    form = SiteCreateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data, "FORM DATA IN CREATE SITE THUNK $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
    if form.validate_on_submit():
        site_to_update = Site.query.get(site_id)
        print("form.validate on submit in the update site route!!!!!!!!!!!!!!!!!!")
        print(site_to_update)
        if not site_to_update:
            return        {"errors": "failed to locate file"}, 404

        if form.data["site_photo"]:
            print("SITE PHOTO THERE, I TOTALLY GET THIS SHIT YO ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
            if site_to_update.site_photo:
                remove_file_from_s3(site_to_update.site_photo)
            image = form.data["site_photo"]
            print(image, "IMAGE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            image.filename = get_unique_filename(image.filename)
            print(image, "IMAGE")
            print(image.filename, "IMAGE>FILENAME")
            upload = upload_file_to_s3(image)
            print(upload, "UPLOAD<<<<<<<<<<<<<<<<")

            if "url" not in upload:
                    print("File upload failed")
                    return {"errors": "File upload failed"}, 400

            url = upload["url"]
            site_to_update.name = form.data["name"]
            site_to_update.lat = form.data["lat"]
            site_to_update.lon = form.data["lon"]
            site_to_update.altitude = form.data["altitude"]
            site_to_update.intro = form.data["intro"]
            site_to_update.user_id = form.data["user_id"]
            site_to_update.site_photo=url
            site_to_update.official = form.data["official"]
        else:
            site_to_update.name = form.data["name"]
            site_to_update.lat = form.data["lat"]
            site_to_update.lon = form.data["lon"]
            site_to_update.altitude = form.data["altitude"]
            site_to_update.intro = form.data["intro"]
            site_to_update.user_id = form.data["user_id"]
            site_to_update.official = form.data["official"]
        db.session.add(site_to_update)
        db.session.commit()
        return site_to_update.to_dict()
    return form.errors, 400


@site_routes.route('/delete/<int:site_id>')
def deleteSite(site_id):
    """
    This route DELETES A SITE FROM THE DB
    """
    site_to_delete = Site.query.get(site_id)
    if not site_to_delete:
        {"errors": "failed to locate file"}, 400
    if site_to_delete.site_photo:
        remove_file_from_s3(site_to_delete.site_photo)


    print(site_to_delete, "SITE TO DELETE ********************************************************************************")
    db.session.delete(site_to_delete)
    db.session.commit()
    return site_to_delete.to_dict()




@site_routes.route('/new', methods = ["POST"])
def createSite():
    """
    This route creates a new site in the database from the form data in the SiteCreateForm
    """
    print("CREATE SITE route CALLED $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
    form = SiteCreateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data, "FORM DATA IN CREATE SITE THUNK $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
    if form.validate_on_submit():
        if form.data["site_photo"]:
            print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> there is SITE photo data")
            image = form.data["site_photo"]
            print(image, "IMAGE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            image.filename = get_unique_filename(image.filename)
            print(image, "IMAGE")
            print(image.filename, "IMAGE>FILENAME")
            upload = upload_file_to_s3(image)
            print(upload, "UPLOAD<<<<<<<<<<<<<<<<")

            if "url" not in upload:
                print("File upload failed")
                return {"errors": "File upload failed"}, 400

            url = upload["url"]
            site = Site(
                name=form.data['name'],
                lat=form.data['lat'],
                lon=form.data['lon'],
                altitude=form.data['altitude'],
                intro=form.data['intro'],
                official=form.data['official'],
                site_photo=url,
                creator_id=form.data['user_id']
            )
        else:
            print("XXXXXXX#################################################### NO SITE photo data")
            print(form.data)
            print("XXXXXXX#################################################### NO SITE photo data")
            site = Site(
                name=form.data['name'],
                lat=form.data['lat'],
                lon=form.data['lon'],
                altitude=form.data['altitude'],
                intro=form.data['intro'],
                official=form.data['official'],
                creator_id=form.data['user_id']
            )

        db.session.add(site)
        db.session.commit()
        return site.to_dict(), 201
    print(form.errors, "FORM ERRORS@@@@@@@@@@@@@@@@@@@@@@@@@@")
    return form.errors, 400
