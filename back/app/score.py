from flask import Blueprint, request
from app import db
from app.models import User, Score


score_bp = Blueprint('score', __name__, url_prefix='/api/score')


@score_bp.route('/')
@score_bp.route('/all')
def all():
    query = Score.query.all()
    scores = []
    for q in query:
        scores.append(q.to_dict())
    return {'scores': scores}, 200


@score_bp.route('/create', methods=['POST'])
def create_score():
    content = request.json
    name = content.get('name', 'anon')
    value = int(content['score'])
    if (user := User.query.filter_by(name=name).first()):
        score = Score(value=value, user=user)
        db.session.add(score)
        db.session.commit()
        return {'score': score.to_dict()}, 201
    return 'user not found', 400
