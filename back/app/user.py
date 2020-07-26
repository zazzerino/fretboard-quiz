from flask import Blueprint, make_response, request, jsonify
from app import db
from app.models import User


user_bp = Blueprint('user', __name__, url_prefix='/api/user')


@user_bp.route('/create', methods=['POST'])
def create():
    name = request.json.get('name')
    password = request.json.get('password')
    email = request.json.get('email')
    if name is None or password is None:
        make_response('must provide username and password', 400)
    if User.query.filter_by(name=name).first() is not None:
        make_response('username already taken', 400)
    user = User(name=name, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return make_response({'user': user.name}, 201)


@user_bp.route('/<username>')
def user(name):
    user = User.query.filter_by(name=name).first()
    return jsonify(user=user.to_dict())
