from flask import Blueprint, make_response
from flask_httpauth import HTTPTokenAuth
from app.models import User


bp = Blueprint('token', __name__, url_prefix='/api/token')
token_auth = HTTPTokenAuth()


@token_auth.verify_token
def verify_token(token):
    return User.check_token(token) if token else None


@token_auth.error_handler
def token_auth_error(status):
    return make_response({'error': 'token auth error'}, 401)


from app.token import routes
