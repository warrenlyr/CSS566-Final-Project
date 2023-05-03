from flask import Flask, render_template
from app import app

# Test environment configuration
@app.route('/')
def hello_world():
    return render_template('testuse.html')

# Test get request
@app.route('/testget', methods=['GET'])
def test_get():
    return 'Response from GET request'