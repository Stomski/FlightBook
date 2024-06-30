from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField, TextAreaField, BooleanField, FloatField
from wtforms.validators import DataRequired, Optional, Length, NumberRange
from flask_wtf.file import FileField, FileAllowed
from ..api.aws_functions import ALLOWED_EXTENSIONS

class SiteCreateForm(FlaskForm):
    name = StringField('Site Name', validators=[DataRequired(), Length(min=7,max=40)])
    lat = FloatField('latitude')
    lon = FloatField('longitude')
    altitude = IntegerField('altitude', validators=[NumberRange(min=0, max=17999)])
    intro = TextAreaField('Log', validators=[DataRequired(), Length(max=1024)])
    user_id = IntegerField('user_id')
    official= BooleanField('official')
    site_photo = FileField('Flight Photo', validators=[FileAllowed(list(ALLOWED_EXTENSIONS), 'Invalid file type.')])
