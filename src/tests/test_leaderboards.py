import pytest
from flask import json

from app import app, API_URL_PREFIX

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client


def test_leaderboard_todays_reward_game(client):
    response = client.get(API_URL_PREFIX + '/leaderboards/todaysrewardgame')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'data' in data
    assert len(data['data']) == 25


@pytest.mark.parametrize("level", [1, 2, 3])
def test_leaderboard_normal_game_valid_levels(client, level):
    response = client.get(API_URL_PREFIX + f'/leaderboards/game/level/{level}')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'data' in data
    assert len(data['data']) == 25


def test_leaderboard_normal_game_invalid_level(client):
    invalid_level = 4
    response = client.get(API_URL_PREFIX + f'/leaderboards/game/level/{invalid_level}')
    assert response.status_code == 400
    data = json.loads(response.data)
    assert 'error' in data
    assert data['error'] == 'Invalid level'
