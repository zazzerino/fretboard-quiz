from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config


db = SQLAlchemy()
migrate = Migrate()


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    CORS(app)

    db.init_app(app)
    migrate.init_app(app, db)

    from app.user import user_bp
    app.register_blueprint(user_bp)

    from app.auth import auth_bp
    app.register_blueprint(auth_bp)

    from app.score import score_bp
    app.register_blueprint(score_bp)

    return app


from app import models
