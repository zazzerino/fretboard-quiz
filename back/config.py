import os


db_uri = '/home/kdp/projects/fretboard-quiz/back/instance/app.sqlite'
sqlite_uri = f'sqlite:///{db_uri}'


class Config():
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'secret'
    SQLALCHEMY_DATABASE_URI = sqlite_uri
    SQLALCHEMY_TRACK_MODIFICATIONS = False
