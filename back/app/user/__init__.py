from flask import Blueprint
from app import login_manager
from app.models import User


bp = Blueprint('user', __name__, url_prefix='/api/user')


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


from app.user import routes
