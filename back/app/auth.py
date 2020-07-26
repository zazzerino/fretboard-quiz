from flask import Blueprint, make_response, jsonify, request
from flask_httpauth import HTTPBasicAuth, HTTPTokenAuth
from app import db
from app.models import User


auth_bp = Blueprint('auth', __name__, url_prefix='/api/token')

basic_auth = HTTPBasicAuth()
token_auth = HTTPTokenAuth()


@basic_auth.verify_password
def verify_password(name, password):
    user = User.query.filter_by(name=name).first()
    if user and user.check_password(password):
        return user


@basic_auth.error_handler
def error_handler(status):
    return make_response('basic auth error', 401)


@token_auth.verify_token
def verify_token(token):
    return User.check_token(token) if token else None


@token_auth.error_handler
def token_auth_error(status):
    return make_response({'error': 'token auth error'}, 401)


@auth_bp.route('/get', methods=['POST'])
@basic_auth.login_required
def get_token():
    user = basic_auth.current_user()
    token = user.get_token()
    db.session.commit()
    return jsonify({'token': token,
                    'name': user.name})


@auth_bp.route('/validate', methods=['POST'])
def validate_token():
    token = request.json['token']
    user = User.check_token(token)
    valid = "true" if user else "false"
    status = 200 if user else 403
    name = user.name if user else None
    response = {
        'valid': valid,
        'token': token,
        'name': name
    }

    return jsonify(response), status


@auth_bp.route('/revoke', methods=['DELETE'])
@token_auth.login_required
def revoke_token():
    token_auth.current_user().revoke_token()
    db.session.commit()
    return make_response('', 204)
