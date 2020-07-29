import base64
import os
from datetime import datetime, timezone, timedelta
from werkzeug.security import generate_password_hash, check_password_hash
from app import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True)
    password_hash = db.Column(db.String(128))
    scores = db.relationship('Score', backref='user', lazy='dynamic')
    token = db.Column(db.String(32), index=True, unique=True)
    token_expiration = db.Column(db.DateTime())

    @staticmethod
    def check_token(token):
        user = User.query.filter_by(token=token).first()
        if user is None or user.token_expiration < datetime.utcnow():
            return None
        return user

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def get_token(self, expires_in=3600):
        now = datetime.utcnow()
        if self.token and self.token_expiration > now:
            return self.token
        self.token = base64.b64encode(os.urandom(24)).decode('utf-8')
        self.token_expiration = now + timedelta(seconds=expires_in)
        db.session.add(self)
        return self.token

    def revoke_token(self):
        now = datetime.now(timezone.utc)
        self.token_expiration = now - timedelta(seconds=1)

    def to_dict(self):
        scores = [s.to_dict() for s in self.scores]
        return {'id': self.id,
                'name': self.name,
                'email': self.email,
                'scores': scores}

    def __repr__(self):
        return f'<User {self.name}>'


class Score(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.Integer)
    timestamp = db.Column('time', db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def to_dict(self):
        local_time = self.timestamp - timedelta(hours=5)
        return {'id': self.id,
                'name': self.user.name,
                'value': self.value,
                'timestamp': local_time.strftime('%b %d %Y %H:%M')}

    def __repr__(self):
        return f'<Score: {self.value} at {self.timestamp}>'
