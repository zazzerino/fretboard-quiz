import os
import tempfile
import json
from base64 import b64encode
import pytest
from fretboard_quiz import app
from app import db


name = 'bob'
password = 'hunter2'


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


def create_user(client, name=name, password=password):
    response = client.post('/api/user/create',
                           content_type='application/json',
                           data=json.dumps(dict(
                               name=name,
                               password=password
                           )))
    return response


def test_index(client):
    response = client.get('/')
    assert response.status_code == 404


def test_user(client):
    response = client.post('/api/user/create')
    assert response.status_code == 400
    assert response.data == b'must provide valid json'

    response = create_user(client)
    data = response.get_json()
    assert response.status_code == 201
    assert data['user']['name'] == 'bob'
    assert data['user']['email'] is None

    response = create_user(client)
    assert response.status_code == 400
    assert response.data == b'username already taken'

    response = client.get('/api/user/bob')
    data = response.get_json()
    assert response.status_code == 200
    assert data['user']['name'] == 'bob'
    assert data['user']['email'] is None


def encode_user(name, password):
    return b64encode(f'{name}:{password}'.encode()).decode()


def test_auth(client):
    name = 'bob'
    password = 'hunter2'

    response = create_user(client)
    data = response.get_json()
    assert response.status_code == 201

    encoding = encode_user(name, password)
    response = client.post('/api/token/get',
                           headers={'Authorization': f'Basic {encoding}'})
    data = response.get_json()
    name = data['name']
    token = data['token']
    assert response.status_code == 200
    assert name == 'bob'
    assert len(token) > 0

    response = client.post('/api/token/get',
                           headers={'Authorization': 'Basic invalidtoken'})
    assert response.status_code == 401

    response = client.post('/api/token/validate',
                           content_type='application/json',
                           data=json.dumps({
                               'token': token
                           }))
    data = response.get_json()
    assert response.status_code == 200
    assert data['name'] == name
    assert len(data['token']) > 0
    assert data['is_valid'] == 'true'

    response = client.post('/api/token/validate',
                           content_type='application/json',
                           data=json.dumps({
                               'token': 'wrong' + token
                           }))
    assert response.status_code == 401

    response = client.delete('/api/token/revoke',
                             headers={'Authorization': f'Bearer {token}'},
                             content_type='application/json',
                             data=json.dumps({
                                 'token': token
                             }))
    assert response.status_code == 204

    response = client.post('/api/token/validate',
                           content_type='application/json',
                           data=json.dumps({
                               'token': token
                           }))
    assert response.status_code == 401

    response = client.delete('/api/token/revoke',
                             headers={'Authorization': 'Bearer wrongtoken'},
                             content_type='application/json',
                             data=json.dumps({
                                 'token': token
                             }))
    assert response.status_code == 401


def test_score(client):
    create_user(client)

    response = client.post('/api/score/create',
                           content_type='application/json',
                           data=json.dumps({
                               'name': name,
                               'score': '4'
                           }))
    assert response.status_code == 201

    response = client.post('/api/score/create',
                           content_type='application/json',
                           data=json.dumps({
                               'score': '4'
                           }))
    assert response.status_code == 400

    create_user(client, 'anon', 'anonpwd')
    response = client.post('/api/score/create',
                           content_type='application/json',
                           data=json.dumps({
                               'score': '9000'
                           }))
    assert response.status_code == 201

    response = client.get('/api/score/all')
    data = response.get_json()
    assert response.status_code == 200
    assert len(data['scores']) == 2
