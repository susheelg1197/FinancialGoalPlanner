from flask import Blueprint, jsonify, request
from app.services.example_service import ExampleService

example_blueprint = Blueprint('example', __name__)

@example_blueprint.route('/', methods=['GET'])
def default_view():
    return jsonify({'message': 'Welcome to the example API!'})


@example_blueprint.route('/example', methods=['POST'])
def create_example():
    data = request.get_json()
    example = ExampleService.create_example(name=data['name'])
    return jsonify({'id': example.id, 'name': example.name})
