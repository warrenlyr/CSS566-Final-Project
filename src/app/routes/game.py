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
from app.models import User, Game, GameHistory


@app.route(API_URL_PREFIX + '/game/dailypuzzle', methods=['GET'])
@jwt_required(optional=True)
def game_get_todays_reward_game():
    '''
    Get today's reward game data and create a game history.

    Login is optional.
    If the user is logged in, the game history will be linked to the user.
    '''
    # retrive the game data
    game = Game()
    todays_reward_game = game.get_todays_reward_game()

    # validate if the game data is retrived successfully
    if not todays_reward_game:
        return make_response(
            jsonify(dict(error='No reward game found')),
            404
        )

    # create a game history
    # if the user is logged in, the game history will be linked to the user
    this_user = None
    identity = get_jwt_identity()
    if identity:
        user = User()
        # get the user id
        this_user = user.get_id(username=identity)

        # check if the user has played the game today
        # if played, we return 423 Locked error to prevent the user from playing again
        if user.check_todays_reward_game_played(identity):
            return make_response(
                jsonify(dict(error='You have played today\'s reward game')),
                423
            )

        # increase the game played count
        user.increase_game_played(identity)

        # set the today's reward game played flag
        user.set_todays_reward_game_played(identity)

    game_history = GameHistory()
    history_id = game_history.create(
        user_id=this_user,
        game_id=todays_reward_game['_id'],
    )
    
    # validate if the game history is created successfully
    if not history_id:
        return make_response(
            jsonify(dict(error='Failed to create game history')),
            500
        )
    
    return make_response(
        jsonify(dict(
            game_data=todays_reward_game,
            game_history_id=history_id
        )),
        200
    )


@app.route(API_URL_PREFIX + '/game/normalpuzzle/<level>', methods=['GET'])
@jwt_required(optional=True)
def game_get_random_game(level):
    '''
    Get a random game data.

    Level is provided in the URL path.
    current_game_id is optional, and can be passed
    as a query parameter.
    
    Login is optional.
    If the user is logged in, the game history will be linked to the user.

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
            jsonify(dict(error='Level is required in the path: /game/normalpuzzle/<level>')),
            400
        )
    
    # get current_game_id from query parameter
    current_game_id = request.args.get('current_game_id', None)

    # get a random game
    game = Game()
    random_game = game.get_a_random_game(level, current_game_id)

    # validate if the game data is retrived successfully
    if not random_game:
        return make_response(
            jsonify(dict(error='No game found')),
            404
        )

    # create a game history
    # if the user is logged in, the game history will be linked to the user
    this_user = None
    identity = get_jwt_identity()
    if identity:
        user = User()
        # get the user id
        this_user = user.get_id(username=identity)
        # increase the game played count
        user.increase_game_played(identity)

    game_history = GameHistory()
    history_id = game_history.create(
        user_id=this_user,
        game_id=random_game['_id'],
    )

    # validate if the game history is created successfully
    if not history_id:
        return make_response(
            jsonify(dict(error='Failed to create game history')),
            500
        )
    
    return make_response(
        jsonify(dict(
            game_data=random_game,
            game_history_id=history_id
        )),
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


@app.route(API_URL_PREFIX + '/game/finish/<game_history_id>', methods=['POST'])
def finish_game(game_history_id: str):
    '''
    Finished a game by given game history id.

    Game history id is provided in the URL path.

    Data is provided in the request body:
    - time_elapsed: time elapsed in ms
    - attemps: number of attempts 
    '''
    # validate and convert game_history_id to string
    if game_history_id:
        try:
            game_history_id = str(game_history_id)
        except Exception as e:
            return make_response(
                jsonify(dict(error='Game history id must be a string')),
                400
            )
    else:
        return make_response(
            jsonify(dict(error='Game history id is required in the path: /game/finish/<game_history_id>')),
            400
        )
    
    # validate if the game history exists
    game_history = GameHistory()
    if not game_history.validate(game_history_id):
        return make_response(
            jsonify(dict(error='Game history not found')),
            404
        )
    
    # get data from request body
    try:
        data = request.get_json()
    except Exception as e:
        return make_response(
            jsonify(dict(error='Failed to get data from the request body')),
            400
        )
    if not data:
        return make_response(
            jsonify(dict(error='time_elapsed and attemps are required in the request body')),
            400
        )
    
    time_elapsed = data.get('time_elapsed', None)
    attemps = data.get('attemps', None)

    if not time_elapsed or not attemps:
        return make_response(
            jsonify(dict(error='time_elapsed and attemps are required in the request body')),
            400
        )
    
    # validate and convert time_elapsed to int
    try:
        time_elapsed = int(time_elapsed)
    except Exception as e:
        return make_response(
            jsonify(dict(error='time_elapsed must be an integer in ms')),
            400
        )
    
    # validate and convert attemps to int
    try:
        attemps = int(attemps)
    except Exception as e:
        return make_response(
            jsonify(dict(error='attemps must be an integer')),
            400
        )
    
    # finish the game
    finished, score, msg = game_history.finish(
        game_history_id=game_history_id,
        time_elapsed=time_elapsed,
        attemps=attemps,
        end_time=datetime.now()
    )

    # if game is not able to be finished
    if not finished:
        return make_response(
            jsonify(dict(error=msg)),
            400
        )
    else:
        # if game is finished successfully without any issue
        if not msg:
            return make_response(
                jsonify(dict(status=finished, score=score)),
                200
            )
        # if game is finished successfully but there is an issue (cheating or hacking)
        else:
            return make_response(
                jsonify(dict(status=finished, score=score, error=msg)),
                200
            )
        

@app.route(API_URL_PREFIX + '/game/sharescore/<game_history_id>', methods=['POST'])
@jwt_required()
def game_share_score_to_leaderboard(game_history_id: str):
    '''
    When a game is finished and a score is calculated scuuessfully,
    we give users an option to share their score to the leaderboard.
    They can either share anonymously or share with their username.

    This function can only be called when the user is logged in.
    So the user id is retrieved from the JWT token.

    Game history id is provided in the URL path.
    '''
    # validate and convert game_history_id to string
    if game_history_id:
        try:
            game_history_id = str(game_history_id)
        except Exception as e:
            return make_response(
                jsonify(dict(error='Game history id must be a string')),
                400
            )
    else:
        return make_response(
            jsonify(dict(error='Game history id is required in the path: /game/finish/<game_history_id>')),
            400
        )
    
    # validate if the game history exists
    game_history = GameHistory()
    if not game_history.validate(game_history_id):
        return make_response(
            jsonify(dict(error='Game history not found')),
            404
        )
    
    # get user id from JWT token
    this_user = get_jwt_identity()
    if not this_user:
        return make_response(
            jsonify(dict(error='User not found')),
            404
        )
        
    #TODO: INCOMPLETE
        
        
@app.route(API_URL_PREFIX + '/game/design', methods=['POST'])
@jwt_required(optional=True)
def game_design_puzzle():
    '''
    Receive request from user to design a puzzle.
    '''
    # get data from request body
    level = request.json.get('level', None)
    size = request.json.get('size', None)
    words = request.json.get('words', None)
    
    # validate and convert level to int
    try:
        level = int(level)
    except Exception as e:
        return make_response(
            jsonify(dict(error='level must be an integer between 1 and 3')),
            400
        )
    
    try:
        size = int(size)
    except Exception as e:
        return make_response(
            jsonify(dict(error='size must be an integer between 5 and 50')),
            400
        )
    
    # validate words
    if not words:
        return make_response(
            jsonify(dict(error='words is required')),
            400
        )
    
    # try to design a puzzle
    game = Game()
    status, 
    
    
    
    

