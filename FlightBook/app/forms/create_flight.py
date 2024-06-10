from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField, TextAreaField
from wtforms.validators import DataRequired, Optional, Length,NumberRange
from flask_wtf.file import FileField, FileAllowed
from ..api.aws_functions import ALLOWED_EXTENSIONS





class FlightCreateForm(FlaskForm):
    site_name = StringField('Site Name', validators=[DataRequired()])
    length = IntegerField('Length', validators=[Optional(), NumberRange(min=0,max=500, message="i dont really believe you")])
    start_time = DateTimeField('Start Time', format='%Y-%m-%dT%H:%M', validators=[DataRequired()])
    equipment = StringField('Equipment',validators=[ Length(max=1024)])
    log = TextAreaField('Log', validators=[DataRequired(),Length(max=1017)])
    weather = IntegerField('Weather')
    flight_photo = FileField('Flight Photo', validators=[FileAllowed(list(ALLOWED_EXTENSIONS), 'Invalid file type.')])
    user_id = IntegerField('user_id')
    site_id = IntegerField('site_id')
