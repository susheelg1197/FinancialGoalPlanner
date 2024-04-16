from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models.users import User
from sqlalchemy.exc import IntegrityError
from werkzeug.security import generate_password_hash

user_blueprint = Blueprint('user_api', __name__)

@user_blueprint.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    if not (username and email and password):
        return jsonify({'error': 'Missing username, email, or password'}), 400
    
    hashed_password = generate_password_hash(password)
    user = User(username=username, email=email, password_hash=hashed_password)
    db.session.add(user)
    try:
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Username or email already exists'}), 400
    return jsonify(user.to_dict()), 201

@user_blueprint.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    return jsonify(user.to_dict())

@user_blueprint.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users]), 200

@user_blueprint.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    data = request.get_json()
    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)
    if data.get('password'):
        user.password_hash = generate_password_hash(data['password'])

    db.session.commit()
    return jsonify(user.to_dict()), 200

@user_blueprint.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({'success': 'User deleted'}), 200
