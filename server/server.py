#!/usr/bin/env python
# Main script handling instantiation and creation of webserver and functionality

import src.apirouting as APIRouter
import src.socketrouting as SocketRouter
from src.app import App

def create_server() -> None:
    """
    Initialization and creation of web server and routing
    """
    App.create_app()
    print("Initialized app")

    APIRouter.create_routes()
    SocketRouter.create_routes()
    print("Created routes")

    print("Running webserver")
    App.run_app(True)
        

if __name__ == '__main__': 
    create_server()