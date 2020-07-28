from flask import Blueprint, request
from app import db
from app.models import User


user_bp = Blueprint('user', __name__, url_prefix='/api/user')


@user_bp.route('/create', methods=['POST'])
def create():
    if request.is_json:
        name = request.json.get('name', None)
        password = request.json.get('password', None)
        email = request.json.get('email', None)

        if name is None or password is None:
            return 'must provide username and password', 400

        if User.query.filter_by(name=name).first() is not None:
            return 'username already taken', 400

        user = User(name=name, email=email)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        return {'user': {'name': user.name,
                         'email': user.email}}, 201
    else:
        return 'must provide valid json', 400


@user_bp.route('/<name>')
def user(name):
    user = User.query.filter_by(name=name).first()
    return {'user': user.to_dict()}, 200
