from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField, TextAreaField, BooleanField
from wtforms.validators import DataRequired, Optional
from flask_wtf.file import FileField, FileAllowed
from ..api.aws_functions import ALLOWED_EXTENSIONS

class SiteCreateForm(FlaskForm):
    name = StringField('Site Name', validators=[DataRequired()])
    lat = IntegerField('latitude')
    lon = IntegerField('longitude')
    altitude = IntegerField('altitude')
    intro = TextAreaField('Log', validators=[DataRequired()])
    user_id = IntegerField('user_id')
    official= BooleanField('official')
    site_photo = FileField('Flight Photo', validators=[FileAllowed(list(ALLOWED_EXTENSIONS), 'Invalid file type.')])
