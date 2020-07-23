from flask import Blueprint, make_response
from flask_httpauth import HTTPBasicAuth
# from app import login_manager
from app.models import User


bp = Blueprint('user', __name__, url_prefix='/api/user')
basic_auth = HTTPBasicAuth()


# @login_manager.user_loader
# def load_user(user_id):
#     return User.query.get(int(user_id))


@basic_auth.verify_password
def verify_password(username, password):
    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        return user


@basic_auth.error_handler
def error_handler(status):
    return make_response('basic auth error', 401)


from app.user import routes
