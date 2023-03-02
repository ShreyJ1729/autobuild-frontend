#!/usr/bin/env python
# Main app module to run flask app

from flask import Flask
from flask_socketio import SocketIO


class App:
    """
    Module creating and running the Flask application
    """
    app = None
    socketio = None

    @classmethod
    def run_app(cls, is_debug: bool=False) -> None:
        """
        Run flask webserver [socket and REST]
        @param is_debug (bool): If flask runs in debug mode
        """
        print("Started SocketIO")
        cls.socketio.run(cls.app, debug=is_debug)
        

    @classmethod
    def create_app(cls) -> None:
        """
        Creates flask RESTful API and socketio server
        """
        cls.app = Flask(__name__)
        cls.app.app_context().push()
        cls.socketio = SocketIO(cls.app)