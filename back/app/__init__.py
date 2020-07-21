from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
login = LoginManager(app)
login.login_view = 'login'

from app import routes, models

# import os
# from flask import Flask
# from flask_cors import CORS
# from . import db
# from . import scores
# from . import censor
# from . import user


# def create_app(test_config=None):
#     app = Flask(__name__, instance_relative_config=True)
#     CORS(app)

#     db_uri = os.path.join(app.instance_path, 'app.sqlite')
#     sqlite_uri = f'sqlite:///{db_uri}'

#     app.config.from_mapping(
#         SECRET_KEY = 'dev',
#         DATABASE = db_uri
#         SQLALCHEMY_DATABASE_URI = sqlite_uri
#         SQLALCHEMY_TRACK_MODIFICATIONS = False
#     )

#     if test_config is None:
#         app.config.from_pyfile('config.py', silent=True)
#     else:
#         app.config.from_mapping(test_config)

#     try:
#         os.makedirs(app.instance_path)
#     except OSError:
#         pass

#     @app.route('/api/name')
#     def name():
#         return {'name': __name__}

#     db.init_app(app)

#     app.register_blueprint(scores.bp)
#     app.register_blueprint(censor.bp)
#     app.register_blueprint(user.bp)

#     return app
