from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from config import Config


db = SQLAlchemy()
migrate = Migrate()
login_manager = LoginManager()
login_manager.login_view = 'user.login'


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    CORS(app)

    db.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)

    from app.user import bp as user_bp
    app.register_blueprint(user_bp)

    from app.score import bp as score_bp
    app.register_blueprint(score_bp)

    from app.token import bp as token_bp
    app.register_blueprint(token_bp)

    return app


from app import models
