from flask import Blueprint, request, jsonify
from app.models.users import User
from app import db

user_blueprint = Blueprint('user_api', __name__)

@user_blueprint.route('/users', methods=['POST'])
def create_user():
    # Logic to create a user
    pass

@user_blueprint.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    # Logic to get a user
    pass

@user_blueprint.route('/users', methods=['GET'])
def get_users():
    # Logic to get all users
    pass

@user_blueprint.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    # Logic to update a user
    pass

@user_blueprint.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    # Logic to delete a user
    pass
