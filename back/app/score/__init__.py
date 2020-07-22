from flask import Blueprint


bp = Blueprint('score', __name__, url_prefix='/api/score')


from app.score import routes
