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


def test_index(client):
    response = client.get('/')
    assert response.status_code == 404


def test_user(client):
    response = client.post('/api/user/create')
    assert response.status_code == 400
    assert response.data == b'must provide valid json'

    response = client.post('/api/user/create',
                           content_type='application/json',
                           data=json.dumps(dict(
                               name='bob',
                               password='hunter2'
                           )))
    data = response.get_json()
    assert response.status_code == 201
    assert data['user']['name'] == 'bob'
    assert data['user']['email'] is None

    response = client.post('/api/user/create',
                           content_type='application/json',
                           data=json.dumps(dict(
                               name='bob',
                               password='hunter2'
                           )))
    assert response.status_code == 400
    assert response.data == b'username already taken'

    response = client.get('/api/user/bob')
    data = response.get_json()
    assert response.status_code == 200
    assert data['user']['name'] == 'bob'
    assert data['user']['email'] is None
