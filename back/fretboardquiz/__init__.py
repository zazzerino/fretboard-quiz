import os
from flask import Flask
from flask_cors import CORS
from . import db
from . import scores
from . import filter


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)

    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'app.sqlite')
    )

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    @app.route('/api/name')
    def name():
        return {'name': __name__}

    db.init_app(app)

    app.register_blueprint(scores.bp)
    app.register_blueprint(filter.bp)

    return app
