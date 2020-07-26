from flask import request, make_response, jsonify
from app import db
from app.models import User
from app.user import bp
from app.token import token_auth


@bp.route('/<username>')
@token_auth.login_required
def user(username):
    user = User.query.filter_by(username=username).first_or_404()
    return jsonify(user=user.to_dict())


@bp.route('/create', methods=['POST'])
def create():
    username = request.json.get('username')
    password = request.json.get('password')
    if username is None or password is None:
        make_response('must provide username and password', 400)
    if User.query.filter_by(username=username).first() is not None:
        make_response('username already taken', 400)
    u = User(username=username)
    u.set_password(password)
    db.session.add(u)
    db.session.commit()
    return make_response({'username': u.username}, 201)
