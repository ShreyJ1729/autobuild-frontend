#!/usr/bin/env python
# Module handling routing of socket requests from Flask app

from src.app import App
from flask_socketio import send, emit

def create_routes() -> None:
    """
    Create URL rules for websockets
    """
    @App.socketio.on('message', namespace='/api/socket')
    def handle_message(message) -> None:
        
        send(message, namespace='/api/socket')
        print(f'received namespace message: {message}')