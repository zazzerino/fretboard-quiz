from flask import Flask, render_template
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from config import Config


db = SQLAlchemy()
migrate = Migrate()
login = LoginManager()
login.login_view = 'login'


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    CORS(app)

    db.init_app(app)
    migrate.init_app(app, db)
    login.init_app(app)

    @app.route('/')
    @app.route('/index')
    def index():
        return render_template('index.html')

    from app.user import bp as user_bp
    app.register_blueprint(user_bp)

    from app.score import bp as score_bp
    app.register_blueprint(score_bp)

    return app


from app import models
