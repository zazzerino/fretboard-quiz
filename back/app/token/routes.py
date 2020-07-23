from flask import jsonify
from app import db
from app.token import bp
from app.user import basic_auth


@bp.route('/get', methods=['POST'])
@basic_auth.login_required
def get_token():
    token = basic_auth.current_user().get_token()
    db.session.commit()
    return jsonify({'token': token})
