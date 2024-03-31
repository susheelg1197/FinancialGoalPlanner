from flask import Blueprint, jsonify

default_blueprint = Blueprint('default', __name__)

@default_blueprint.route('/')
def default_route():
    return jsonify({'message': 'Welcome to the Flask application!'})
