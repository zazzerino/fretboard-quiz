from flask import Blueprint
# from app.models import User, Score
# from app import db


bp = Blueprint('score', __name__, url_prefix='/score')


from app.score import routes


# from fretboardquiz.db import get_db
# from fretboardquiz.censor import censor

# bp = Blueprint('scores', __name__, url_prefix='/api/scores')


# def dict_factory(cursor, row):
#     d = {}
#     for idx, col in enumerate(cursor.description):
#         d[col[0]] = row[idx]
#     return d


# @bp.route('/', methods=['GET'])
# def view_scores():
#     db = get_db()
#     db.row_factory = dict_factory

#     c = db.cursor()
#     c.execute('SELECT * FROM scores ORDER BY score DESC')

#     scores = c.fetchall()

#     return {'scores': scores}


# @bp.route('/create', methods=['POST'])
# def create_score():
#     content = request.json
#     name = content['name']
#     score = content['score']

#     censor_data = censor(name)
#     is_profane = censor_data['is_profane']

#     cleaned_name = censor_data['censored_text'] if is_profane else name

#     try:
#         db = get_db()
#         c = db.cursor()
#         sql = '''INSERT INTO scores (name, score) VALUES (?, ?)'''
#         # c.execute(sql, (name, score))
#         c.execute(sql, (cleaned_name, score))
#         db.commit()
#         return make_response('CREATED', 201)

#     except Exception:
#         return make_response('WHOOPS', 500)
