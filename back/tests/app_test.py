import os
import tempfile
import json
import pytest
from fretboard_quiz import app
from app import db


@pytest.fixture
def client():
    temp_db, test_db_pathname = tempfile.mkstemp()
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{test_db_pathname}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    with app.test_client() as client:
        with app.app_context():
            db.create_all()
        yield client

    os.close(temp_db)
    os.unlink(test_db_pathname)


def test_root(client):
    response = client.get('/')
    assert response is not None
    assert response.status_code == 404


def test_create_user(client):
    response = client.post('/api/user/create',
                           content_type='application/json',
                           data=json.dumps(dict(
                               name='bob',
                               password='hunter2'
                           )))

    assert response.status_code == 201
