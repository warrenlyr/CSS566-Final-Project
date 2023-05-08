import json

def test_api_status(client):
    response = client.get('/api/v0/status')
    assert response.status_code == 200
    assert response.get_json() == {"status": "OK"}


def test_auth_register(client):
    response = client.post('/api/v0/auth/register', json={'username': 'testuser', 'password': 'testpassword'})
    assert response.status_code == 200
    assert 'User registered successfully' in response.get_json().values()


def test_auth_login(client):
    # Replace 'testuser' and 'testpassword' with valid credentials from your database
    response = client.post('/api/v0/auth/login', json={'username': 'testuser', 'password': 'testpassword'})
    assert response.status_code == 200
    assert 'access_token' in response.get_json()


def test_auth_user_profile(client):
    # Replace 'valid_access_token' with a valid access token from your database
    response = client.get('/api/v0/auth/profile', headers={'Authorization': f'Bearer valid_access_token'})
    assert response.status_code == 200
    assert 'username' in response.get_json()


def test_auth_logout(client):
    # Replace 'valid_access_token' with a valid access token from your database
    response = client.post('/api/v0/auth/logout', headers={'Authorization': f'Bearer valid_access_token'})
    assert response.status_code == 200
    assert 'Logout successful' in response.get_json().values()


def test_auth_delete_account(client):
    # Replace 'valid_access_token' with a valid access token from your database
    response = client.delete('/api/v0/auth/deleteaccount', headers={'Authorization': f'Bearer valid_access_token'})
    assert response.status_code == 200
    assert 'User deleted successfully' in response.get_json().values()
