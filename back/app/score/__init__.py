from flask import Blueprint
from app.models import User


bp = Blueprint('score', __name__, url_prefix='/api/score')


from app.score import routes
