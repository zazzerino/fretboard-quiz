from flask import Blueprint


bp = Blueprint('token', __name__, url_prefix='/api/token')


def get_token():
    pass


def revoke_token():
    pass


from app.token import routes
