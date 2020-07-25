from flask import request, make_response, jsonify
from app import db
from app.score import bp
from app.models import User, Score
from app.token import token_auth


@bp.route('/')
@bp.route('/all')
def all():
    query = Score.query.all()
    scores = []
    for q in query:
        scores.append(q.to_dict())
    return jsonify(scores=scores)


@bp.route('/create', methods=['POST'])
@token_auth.login_required
def create_score():
    content = request.json
    username = content['name']
    value = int(content['score'])

    user = User.query.filter_by(username=username).first()
    if user is not None:
        score = Score(value=value, user=user)
        db.session.add(score)
        db.session.commit()
        return make_response('created', 201)
    else:
        return make_response('user not found', 401)
