'''
This file contains all endpoints for games.
'''

from flask import Flask, render_template, request, make_response, jsonify
from flask_jwt_extended import (
    create_access_token, create_refresh_token, jwt_required, get_jwt_identity, unset_jwt_cookies,
    get_jwt)
from datetime import datetime
import json

from app import app, API_URL_PREFIX
from app.models import User
from app.models import Game


@app.route(API_URL_PREFIX + '/game/todaysrewardgame', methods=['GET'])
def game_get_todays_reward_game():
    '''
    Get today's reward game data.
    '''

    game = Game()
    todays_reward_game = game.get_todays_reward_game()

    if not todays_reward_game:
        return make_response(
            jsonify(dict(error='No reward game found')),
            404
        )
    
    return make_response(
        jsonify(todays_reward_game),
        200
    )


@app.route(API_URL_PREFIX + '/game/normal/<level>', methods=['GET'])
def game_get_random_game(level):
    '''
    Get a random game data.

    Level is provided in the URL path.
    current_game_id is optional, and can be passed
    as a query parameter.

    If current_game_id is provided, which means the 
    user is requesting a new game after finishing a
    game, the new game will be different from the
    current game.
    So when we query the database, we need to exclude
    the current game.
    '''

    # validate and convert level to int
    if level:
        try:
            level = int(level)
        except Exception as e:
            return make_response(
                jsonify(dict(error='Level must be an integer')),
                400
            )
        if level < 1 or level > 3:
            return make_response(
                jsonify(dict(error='Level must be between 1 and 3')),
                400
            )
    else:
        return make_response(
            jsonify(dict(error='Level is required in the path: /game/normal/<level>')),
            400
        )
    
    # get current_game_id from query parameter
    current_game_id = request.args.get('current_game_id', None)

    # get a random game
    game = Game()
    random_game = game.get_a_random_game(level, current_game_id)

    if not random_game:
        return make_response(
            jsonify(dict(error='No game found')),
            404
        )
    
    return make_response(
        jsonify(random_game),
        200
    )


@app.route(API_URL_PREFIX + '/game/key/<game_id>', methods=['GET'])
def game_get_game_key_by_id(game_id):
    '''
    Get a game key by game id if user requests.

    Game id is provided in the URL path.
    '''
    # validate and convert game_id to string
    if game_id:
        try:
            game_id = str(game_id)
        except Exception as e:
            return make_response(
                jsonify(dict(error='Game id must be a string')),
                400
            )
    else:
        return make_response(
            jsonify(dict(error='Game id is required in the path: /game/key/<game_id>')),
            400
        )
    
    # get game key
    game = Game()
    game_key = game.get_key_of_a_game(game_id)

    if not game_key:
        return make_response(
            jsonify(dict(error='No game found')),
            404
        )
    
    return make_response(
        jsonify(game_key),
        200
    )

    


