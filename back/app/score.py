from flask import Blueprint, request, make_response, jsonify
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
    return jsonify(scores=scores)


@score_bp.route('/create', methods=['POST'])
def create_score():
    content = request.json
    name = content['name'] or 'anon'
    value = int(content['score'])

    user = User.query.filter_by(name=name).first()
    if user is not None:
        score = Score(value=value, user=user)
        db.session.add(score)
        db.session.commit()
        return make_response('created', 201)
    else:
        return make_response('user not found', 401)
