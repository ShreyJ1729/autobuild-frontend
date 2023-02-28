from src.app import socketio
from flask_socketio import send, emit

@socketio.on('message')
def handle_message(data):
    print(f'received message: {data}')
    send(data)

@socketio.on('json')
def handle_json(json):
    print(f'received json: {str(json)}')
    send(json, json=True)