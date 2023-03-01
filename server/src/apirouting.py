#!/usr/bin/env python
# Module handling routing of RESTful requests from Flask app

from flask import request, current_app as app

def _default_index() -> str:
    """
    Default index
    """
    return "Hi"

def _name_page(name: str) -> str:
    """
    Name page
    """
    return f"Hi, {name}. Welcome to this website!"

routes: dict = {
    "/api/get": [_default_index, 'POST'],
    "/api/get2": [_name_page, 'GET'],
}

def create_routes():
    """
    Create url rules and add to app
    """
    gets_text: str = "<b>GET METHODS</b>\n"
    posts_test: str = "<b>POST METHODS</b>\n"

    for name, value in routes.items():
        if value[1] == 'GET':
            gets_text += (name + "\n")
        else:
            posts_test += (name + "\n")

    final_text: str = gets_text + "\n\n" + posts_test
    for page_name in routes:
        with app.app_context():
            @app.errorhandler(404)
            def _error_endpoint(error) -> str:
                return f"{error}\n\n{final_text}"
            app.add_url_rule(page_name, view_func=routes[page_name][0], methods=[routes[page_name][1]])