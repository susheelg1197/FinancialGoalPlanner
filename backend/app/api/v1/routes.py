from . import v1_blueprint
from flask import jsonify

@v1_blueprint.route('/hello')
def hello():
    return jsonify({'message': 'Hello, World!'})
