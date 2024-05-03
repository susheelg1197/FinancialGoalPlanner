from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.extensions import db
from app.models.expense import Expense
from app.utils.utils import get_user_id_from_token  
from datetime import datetime, date


expense_blueprint = Blueprint('expenses', __name__)

@expense_blueprint.route('/expenses', methods=['POST'])
@jwt_required()
def create_expense():
    user_id = get_user_id_from_token()
    if not user_id:
        return jsonify({'error': 'User not authenticated'}), 401
    data = request.get_json()
    new_expense = Expense(
        category=data['category'],
        title=data['title'],
        amount=data['amount'],
        created_by=user_id  
    )
    db.session.add(new_expense)
    db.session.commit()
    return jsonify(new_expense.to_dict()), 201

@expense_blueprint.route('/expenses/<int:expense_id>', methods=['GET'])
@jwt_required()
def get_expense(expense_id):
    expense = Expense.query.get(expense_id)
    if expense:
        return jsonify(expense.to_dict())
    return jsonify({'message': 'Expense not found'}), 404

@expense_blueprint.route('/expenses', methods=['GET'])
@jwt_required()
def get_expenses():
    expenses = Expense.query.all()
    return jsonify([expense.to_dict() for expense in expenses]), 200

@expense_blueprint.route('/expenses/<int:expense_id>', methods=['PUT'])
@jwt_required()
def update_expense(expense_id):
    expense = Expense.query.get(expense_id)
    if expense:
        data = request.get_json()
        expense.category = data.get('category', expense.category)
        expense.title = data.get('title', expense.title)
        expense.amount = data.get('amount', expense.amount)
        db.session.commit()
        return jsonify(expense.to_dict())
    return jsonify({'message': 'Expense not found'}), 404

@expense_blueprint.route('/expenses/<int:expense_id>', methods=['DELETE'])
@jwt_required()
def delete_expense(expense_id):
    expense = Expense.query.get(expense_id)
    if expense:
        db.session.delete(expense)
        db.session.commit()
        return jsonify({'message': 'Expense deleted'})
    return jsonify({'message': 'Expense not found'}), 404

@expense_blueprint.route('/expenses/by_user', methods=['GET'])
@jwt_required()
def get_user_expenses():
    user_id = get_user_id_from_token()
    if not user_id:
        return jsonify({'error': 'User not authenticated'}), 401
    
    goals = Expense.query.filter_by(created_by=user_id).all()
    return jsonify([goal.to_dict() for goal in goals]), 200

@expense_blueprint.route('/expenses/search', methods=['GET'])
@jwt_required()
def search_expenses():
    query = Expense.query

    # Filters from query parameters
    category = request.args.get('category')
    title = request.args.get('title')
    created_on_start = request.args.get('created_on_start')
    created_on_end = request.args.get('created_on_end')
    min_amount = request.args.get('min_amount', type=float)
    max_amount = request.args.get('max_amount', type=float)

    # Build the query based on filters
    if category:
        query = query.filter(Expense.category.ilike(f'%{category}%'))

    if title:
        query = query.filter(Expense.title.ilike(f'%{title}%'))

    if created_on_start and created_on_end:
        try:
            created_on_start = datetime.strptime(created_on_start, '%Y-%m-%d')
            created_on_end = datetime.strptime(created_on_end, '%Y-%m-%d')
            query = query.filter(Expense.created_on.between(created_on_start, created_on_end))
        except ValueError:
            return jsonify({'error': 'Invalid date format, use YYYY-MM-DD'}), 400

    if min_amount is not None and max_amount is not None:
        query = query.filter(Expense.amount.between(min_amount, max_amount))

    # Execute query
    results = query.all()
    return jsonify([expense.to_dict() for expense in results]), 200
