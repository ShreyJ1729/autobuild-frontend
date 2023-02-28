#!/usr/bin/env python
# Main 

from flask import Flask
from flask import current_app as app
from flask_socketio import SocketIO

socketio = SocketIO(app)

"""
Module creating and running the Flask application
"""

def run_app(is_debug: bool=False) -> None:
    """
    Run flask webserver [socket and REST]
    @param is_debug (bool): If flask runs in debug mode
    """
    socketio.run(app)
    app.run(debug=is_debug)

def create_app() -> None:
    app_obj = Flask(__name__)
    app_obj.app_context().push()