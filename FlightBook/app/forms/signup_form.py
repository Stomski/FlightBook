from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.aws_functions import ALLOWED_EXTENSIONS


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def testvalidation(form,field):
    print("#######$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
    print(form, field)


    if(True):
        raise ValidationError(f"your couch is not very nice")








class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists,])
    email = StringField('email', validators=[DataRequired(), user_exists,])
    password = StringField('password', validators=[DataRequired(),Length(min=8, max=25)])
    first_name = StringField('first name', validators=[Length(min=3, max=35)])
    last_name = StringField('last name', validators=[Length(min=3, max=35)])
    user_photo =FileField('Profile Image', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
