from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length
from ..api.aws_functions import ALLOWED_EXTENSIONS

class ReviewCreateForm(FlaskForm):
    creator_id = IntegerField('creator_id')
    review = TextAreaField('Log', validators=[DataRequired(), Length(max=1024)])
    site_id = StringField('Site Name', validators=[DataRequired(), Length(min=7,max=40)])
