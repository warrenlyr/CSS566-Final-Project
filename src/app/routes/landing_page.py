from flask import Flask, render_template
from app import app

# Test environment configuration
@app.route('/')
def hello_world():
    return render_template('testuse.html')