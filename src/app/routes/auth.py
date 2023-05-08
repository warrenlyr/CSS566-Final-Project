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
from app.models import User


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

    # validate request
    if not username or not password:
        return make_response(
            jsonify(dict(error='Username and password are required')),
            400
        )
    
    # validate user
    user = User()
    validated, error = user.validate(username, password)
    if not validated:
        return make_response(
            jsonify(dict(error=error)),
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
    print(user_identity)

    user = User()
    user_profile = user.get_profile(user_identity)

    return make_response(
        jsonify(user_profile),
        200
    )


@app.route(API_URL_PREFIX + '/auth/register', methods=['POST'])
def auth_register():
    '''
    Register a new user.
    '''
    username = request.json.get('username', None)
    password = request.json.get('password', None)

    # validate request
    if not username or not password:
        return make_response(
            jsonify(dict(error='Username and password are required')),
            400
        )
    
    # register user
    user = User()
    registered, error = user.create(username, password)
    
    if not registered:
        return make_response(
            jsonify(dict(error=error)),
            400
        )
    
    return make_response(
        jsonify(dict(message='User registered successfully')),
        200
    )


@app.route(API_URL_PREFIX + '/auth/deleteaccount', methods=['POST'])
@jwt_required()
def auth_delete_account():
    '''
    Delete the user account.

    Since this function is jwt_required, the user must be logged in.
    Therefore, we don't need to validate the user identity.
    '''
    # get the user identity
    user_identity = get_jwt_identity()

    # delete the user
    user = User()
    deleted, error = user.remove_user(user_identity)

    if not deleted:
        return make_response(
            jsonify(dict(error=error)),
            422
        )
    
    return make_response(
        jsonify(dict(message='User deleted successfully')),
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
