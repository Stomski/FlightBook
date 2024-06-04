from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField, TextAreaField
from wtforms.validators import DataRequired, Optional
from flask_wtf.file import FileField, FileAllowed
from ..api.aws_functions import ALLOWED_EXTENSIONS

class FlightCreateForm(FlaskForm):
    site_name = StringField('Site Name', validators=[DataRequired()])
    length = IntegerField('Length', validators=[Optional()])
    start_time = DateTimeField('Start Time', format='%Y-%m-%dT%H:%M', validators=[DataRequired()])
    equipment = StringField('Equipment')
    log = TextAreaField('Log', validators=[DataRequired()])
    weather = IntegerField('Weather')
    flight_photo = FileField('Flight Photo', validators=[FileAllowed(list(ALLOWED_EXTENSIONS), 'Invalid file type.')])