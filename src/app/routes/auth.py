'''
This file contains all endpoints for user auth and registration.
'''

from flask import Flask, render_template, request, make_response, jsonify
from flask_jwt_extended import (
    create_access_token, create_refresh_token, jwt_required, get_jwt_identity, unset_jwt_cookies,
    get_jwt)
from datetime import datetime
import json

from app import app, API_URL_PREFIX


@app.route(API_URL_PREFIX + '/status', methods=['GET'])
def api_status():
    '''
    API status endpoint, return OK if the API is running.
    '''
    return make_response(
        jsonify(dict(status='OK')),
        200
    )


@app.route(API_URL_PREFIX + '/auth/login', methods=['POST'])
def auth_login():
    '''
    Create access token for the user.
    '''
    username = request.json.get('username', None)
    password = request.json.get('password', None)

    # validate the username and password
    # TEST WARNING: this is a test, we will use dummy data for now
    # later, we will use the database to validate the user
    # and also encrypt the password
    if username != 'test' and password != 'test':
        return make_response(
            jsonify(dict(error='Invalid credentials')),
            401
        )

    # create the access token
    access_token = create_access_token(identity=username)

    return make_response(
        jsonify(dict(access_token=access_token)),
        200
    )


@app.route(API_URL_PREFIX + '/auth/logout', methods=['POST'])
def auth_logout():
    '''
    Logout the user.
    '''
    res = jsonify({'message': 'Logout successful'})
    unset_jwt_cookies(res)
    return make_response(
        res,
        200
    )


@app.route(API_URL_PREFIX + '/auth/profile', methods=['GET'])
@jwt_required()
def auth_user_profile():
    '''
    Return the user profile.
    '''
    # get the user identity
    user_identity = get_jwt_identity()

    # TEST WARNING: this is a test, we will use dummy data for now
    # later, we will use the database to get the user profile
    user_profile = {
        'username': user_identity,
        'account_created': '2023/05/06',
        'games_played': 100,
    }

    return make_response(
        jsonify(user_profile),
        200
    )


'''
Belower are helper functions, above are API endpoints.
'''


@app.after_request
def refresh_expiring_jwts(response):
    '''
    Automatically refresh the access token when it is about to expire.
    '''
    try:
        exp_timestamp = get_jwt()['exp']
        now = datetime.now()
        target_timestamp = datetime.timestamp(
            now + app.config['JWT_REFRESH_DELTA'])

        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) == dict:
                data['access_token'] = access_token
                response.data = json.dumps(data)

    except (RuntimeError, KeyError):
        pass

    finally:
        return response
