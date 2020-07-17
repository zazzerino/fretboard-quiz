import collections
from flask import (
    Blueprint, request, make_response
)

from app.db import get_db

bp = Blueprint('scores', __name__, url_prefix='/scores')


def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


@bp.route('/', methods=['GET'])
def view_scores():
    db = get_db()
    db.row_factory = dict_factory

    c = db.cursor()
    c.execute('SELECT * FROM scores ORDER BY score DESC')

    scores = c.fetchall()

    return {'scores': scores}


@bp.route('/create', methods=['POST'])
def create_score():
    content = request.json
    name = content['name']
    score = content['score']

    try:
        db = get_db()
        c = db.cursor()
        sql = '''INSERT INTO scores (name, score) VALUES (?, ?)'''
        c.execute(sql, (name, score))
        db.commit()
        return make_response('CREATED', 201)

    except Exception:
        return make_response('WHOOPS', 500)
