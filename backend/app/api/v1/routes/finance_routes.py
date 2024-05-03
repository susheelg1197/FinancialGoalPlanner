from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.extensions import db
from app.models.finance import Finance
from app.utils.utils import get_user_id_from_token
from datetime import datetime

finance_blueprint = Blueprint('finances', __name__)

@finance_blueprint.route('/finances', methods=['POST'])
@jwt_required()
def create_finance():
    user_id = get_user_id_from_token()
    if not user_id:
        return jsonify({'error': 'User not authenticated'}), 401
    data = request.get_json()
    new_finance = Finance(
        title=data['title'],
        description=data.get('description', ''),
        created_by=user_id,
        created_on=datetime.utcnow(),
        amount=data['amount'],
        type=data['type']
    )
    db.session.add(new_finance)
    db.session.commit()
    return jsonify(new_finance.to_dict()), 201

@finance_blueprint.route('/finances/<int:finance_id>', methods=['GET'])
@jwt_required()
def get_finance(finance_id):
    finance = Finance.query.get(finance_id)
    if finance:
        return jsonify(finance.to_dict())
    return jsonify({'message': 'Finance record not found'}), 404

@finance_blueprint.route('/finances', methods=['GET'])
@jwt_required()
def get_finances():
    finances = Finance.query.all()
    return jsonify([finance.to_dict() for finance in finances]), 200

@finance_blueprint.route('/finances/<int:finance_id>', methods=['PUT'])
@jwt_required()
def update_finance(finance_id):
    finance = Finance.query.get(finance_id)
    if finance:
        data = request.get_json()
        finance.title = data.get('title', finance.title)
        finance.description = data.get('description', finance.description)
        finance.amount = data.get('amount', finance.amount)
        finance.type = data.get('type', finance.type)
        db.session.commit()
        return jsonify(finance.to_dict())
    return jsonify({'message': 'Finance record not found'}), 404

@finance_blueprint.route('/finances/<int:finance_id>', methods=['DELETE'])
@jwt_required()
def delete_finance(finance_id):
    finance = Finance.query.get(finance_id)
    if finance:
        db.session.delete(finance)
        db.session.commit()
        return jsonify({'message': 'Finance record deleted'})
    return jsonify({'message': 'Finance record not found'}), 404

@finance_blueprint.route('/finances/search', methods=['GET'])
@jwt_required()
def search_finances():
    query = Finance.query

    # Filters from query parameters
    title = request.args.get('title')
    type = request.args.get('type')
    min_amount = request.args.get('min_amount', type=float)
    max_amount = request.args.get('max_amount', type=float)

    # Build the query based on filters
    if title:
        query = query.filter(Finance.title.ilike(f'%{title}%'))

    if type:
        query = query.filter(Finance.type == type)

    if min_amount is not None and max_amount is not None:
        query = query.filter(Finance.amount.between(min_amount, max_amount))

    # Execute query
    results = query.all()
    return jsonify([finance.to_dict() for finance in results]), 200
