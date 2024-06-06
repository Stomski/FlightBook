from flask import Blueprint, request
from flask_login import login_required
from app.models import Site, db
from ..forms.create_site import SiteCreateForm
from ..api.aws_functions import upload_file_to_s3, get_unique_filename


site_routes = Blueprint('sites', __name__)


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




@site_routes.route('/new', methods = ["POST"])
def createSite():
    """
    This route creates a new site in the database from the form data in the SiteCreateForm
    """
    print("CREATE SITE THUNK CALLED $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
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

    return form.errors, 400
