import collections
from flask import (
    Blueprint
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
    c.execute('SELECT * FROM scores')

    scores = c.fetchall()

    return {'scores': scores}
