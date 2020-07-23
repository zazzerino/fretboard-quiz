from flask import jsonify, make_response, request
from app import db
from app.models import User
from app.token import bp, token_auth
from app.user import basic_auth


@bp.route('/get', methods=['POST'])
@basic_auth.login_required
def get_token():
    token = basic_auth.current_user().get_token()
    db.session.commit()
    return jsonify({'token': token})


@bp.route('/validate', methods=['POST'])
def validate_token():
    token = request.json['token']
    user = User.check_token(token)
    if user:
        return make_response({'valid_token': True, 'username': user.username})
    return make_response({'valid_token': False}, 403)


@bp.route('/revoke', methods=['DELETE'])
@token_auth.login_required
def revoke_token():
    token_auth.current_user().revoke_token()
    db.session.commit()
    return make_response('', 204)
