'''
This file contains all endpoints for leaderboards.
'''
from flask import Flask, render_template, request, make_response

from app import app, API_URL_PREFIX


@app.route(API_URL_PREFIX + '/leaderboards/todaysrewardgame', methods=['GET'])
def leaderboard_todays_reward_game():
    '''
    Return the leaderboard data for today's reward game.
    '''
    # test use dummy data
    # 25 entries, each entry has a rank, username, and score
    data = [
        {
            'rank': i,
            'username': f'test-todaysrewardgame-rank-{i}' if i % 10 != 0 else 'Anonymous',
            'score': 100-i
        } for i in range(25)
    ]

    return make_response(
        dict(data=data),
        200
    )


@app.route(API_URL_PREFIX + '/leaderboards/game/level/<level>', methods=['GET'])
def leaderboard_normal_game(level: int):
    '''
    Return the leaderboard data for the normal game based on the level.
    We will have 3 levels in total.
    '''
    # format the level
    level = int(level)

    # validate the level
    if level in [1, 2, 3]:
        # test use dummy data
        # 25 entries, each entry has a rank, username, and score
        data = [
            {
                'rank': i,
                'username': f'test-normalgame-level-{level}-rank-{i}' if i % 10 != 0 else 'Anonymous',
                'score': 100-i
            } for i in range(25)
        ]

        return make_response(
            dict(data=data),
            200
        )

    # invalid level
    return make_response(
        dict(error='Invalid level'),
        400
    )
