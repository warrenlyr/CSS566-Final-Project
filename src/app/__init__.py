'''
---------------------------------------------------------------
Author: Warren Liu
---------------------------------------------------------------
Team: Purple Kitty Squad
Stakeholders:
- Warren Liu (Lead Developer/Architecture) (Backend Developer)
- Barack Liu (Product Owner)
- Haihan Jiang (QA Engineer)
- Shahruz Mannan (Sprint 1 Scrum Master)
- Amalaye Oyake (Sprint 2 Scrum Master)
- Arsheya Raj (Designer) (Frontend Developer)
---------------------------------------------------------------
Project: 
CSS 566 Software Management
Final Project
Spring 2023
University of Washington, Bothell
---------------------------------------------------------------
Purpose:
This file is the main file for the application. It is the entry
point for the application. It is responsible for starting the
application and running it.
---------------------------------------------------------------
'''

import os
import sys
from datetime import timedelta
# import dotenv

# Insert the parent directory into the sys path
this_path = os.path.abspath(os.path.join(os.path.dirname(os.path.realpath(__file__)), os.pardir))
sys.path.insert(0, this_path)
# Load the environment variables
# env_file_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), os.pardir, '.env')
# dotenv.load_dotenv(env_file_path)

# Flask app configuration
from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS #comment this on deployment

app = Flask(__name__)
app.config['SECRET_KEY'] = 'test-remember-to-change-this' # will be loaded from .env file when deployed
app.config['JWT_SECRET_KEY'] = 'test-remember-to-change-this' # will be loaded from .env file when deployed
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
app.config['JWT_REFRESH_DELTA'] = timedelta(minutes=30)
CORS(app)
jwt = JWTManager(app)

# API URL prefix
API_VERSION = 'v0'
API_URL_PREFIX = '/api/' + API_VERSION

from app.routes import *