'''
This file contains all endpoints for handling errors.
'''

from flask import Flask, render_template, request, make_response

from app import app, API_URL_PREFIX


@app.errorhandler(404)
def endpoint_not_found(e: Exception):
    '''
    Handle 404 not found error.
    '''
    return make_response(
        dict(error=str(e)),
        404
    )