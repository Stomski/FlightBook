from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length

class ReviewCreateForm(FlaskForm):
    creator_id = IntegerField('creator_id')
    review = TextAreaField('Log', validators=[DataRequired(), Length(max=1024)])
    site_id = StringField('Site Name', validators=[DataRequired()])
