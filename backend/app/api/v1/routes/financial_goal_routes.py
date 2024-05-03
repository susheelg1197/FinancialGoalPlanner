# app/api/v1/routes/financial_goal_routes.py

from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models.financial_goal import FinancialGoal
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime, date
from app.utils.utils import get_user_id_from_token  

financial_goal_blueprint = Blueprint('financial_goals', __name__)

@financial_goal_blueprint.route('/financial_goals', methods=['POST'])
@jwt_required()
def create_financial_goal():
    user_id = get_user_id_from_token()
    if not user_id:
        return jsonify({'error': 'User not authenticated'}), 401

    data = request.get_json()

    # Required fields check
    required_fields = ['name', 'startDate', 'endDate', 'currentAmount', 'targetAmount']
    missing_fields = [field for field in required_fields if field not in data or not data[field]]
    if missing_fields:
        return jsonify({'error': f'Missing data for required field(s): {", ".join(missing_fields)}'}), 400

    # Parse dates
    try:
        start_date = datetime.strptime(data['startDate'], '%Y-%m-%d').date()
        end_date = datetime.strptime(data['endDate'], '%Y-%m-%d').date()
    except ValueError:
        return jsonify({'error': 'Invalid date format, use YYYY-MM-DD'}), 400

    # Determine status based on dates
    today = date.today()
    status = 'New'
    if today >= start_date and today < end_date:
        status = 'Ongoing'
    elif today >= end_date:
        status = 'Completed'

    new_goal = FinancialGoal(
        user_id=user_id,
        name=data['name'],
        description=data.get('description', ''),
        created_by=user_id,
        created_on=datetime.utcnow(),
        start_date=start_date,
        end_date=end_date,
        current_amount=data['currentAmount'],
        target_amount=data['targetAmount'],
        category=data.get('category', ''),
        status=status
    )
    db.session.add(new_goal)
    db.session.commit()
    return jsonify(new_goal.to_dict()), 201


@financial_goal_blueprint.route('/financial_goals/<int:goal_id>', methods=['GET'])
@jwt_required()
def get_financial_goal(goal_id):
    goal = FinancialGoal.query.get(goal_id)
    if goal:
        return jsonify(goal.to_dict())
    return jsonify({'message': 'Financial goal not found'}), 404

@financial_goal_blueprint.route('/financial_goals', methods=['GET'])
@jwt_required()
def get_financial_goals():
    goals = FinancialGoal.query.all()
    return jsonify([goal.to_dict() for goal in goals])

@financial_goal_blueprint.route('/financial_goals/<int:goal_id>', methods=['PUT'])
@jwt_required()
def update_financial_goal(goal_id):
    goal = FinancialGoal.query.get(goal_id)
    if goal:
        data = request.get_json()

        # Update goal properties
        goal.name = data.get('name', goal.name)
        goal.description = data.get('description', goal.description)
        goal.start_date = datetime.strptime(data.get('startDate', goal.start_date.isoformat()), '%Y-%m-%d').date()
        goal.end_date = datetime.strptime(data.get('endDate', goal.end_date.isoformat()), '%Y-%m-%d').date()
        goal.current_amount = data.get('currentAmount', goal.current_amount)
        goal.target_amount = data.get('targetAmount', goal.target_amount)
        goal.category = data.get('category', goal.category)

        # Update status based on dates
        today = date.today()
        if today >= goal.start_date and today < goal.end_date:
            goal.status = 'Ongoing'
        elif today >= goal.end_date:
            goal.status = 'Completed'

        db.session.commit()
        return jsonify(goal.to_dict())
    return jsonify({'message': 'Financial goal not found'}), 404

@financial_goal_blueprint.route('/financial_goals/<int:goal_id>', methods=['DELETE'])
@jwt_required()
def delete_financial_goal(goal_id):
    goal = FinancialGoal.query.get(goal_id)
    if goal:
        db.session.delete(goal)
        db.session.commit()
        return jsonify({'message': 'Financial goal deleted'})
    return jsonify({'message': 'Financial goal not found'}), 404


@financial_goal_blueprint.route('/financial_goals/by_user', methods=['GET'])
@jwt_required()
def get_user_financial_goals():
    user_id = get_user_id_from_token()
    if not user_id:
        return jsonify({'error': 'User not authenticated'}), 401
    
    goals = FinancialGoal.query.filter_by(user_id=user_id).all()
    return jsonify([goal.to_dict() for goal in goals]), 200

@financial_goal_blueprint.route('/financial_goals/search', methods=['GET'])
@jwt_required()
def search_financial_goals():
    query = FinancialGoal.query

    # Filters
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    status = request.args.get('status')
    name = request.args.get('name')

    # Build query based on filters
    if start_date and end_date:
        try:
            start_date = datetime.strptime(start_date, '%Y-%m-%d').date()
            end_date = datetime.strptime(end_date, '%Y-%m-%d').date()
            query = query.filter(FinancialGoal.start_date.between(start_date, end_date))
        except ValueError:
            return jsonify({'error': 'Invalid date format, use YYYY-MM-DD'}), 400

    if status:
        query = query.filter(FinancialGoal.status == status)

    if name:
        query = query.filter(FinancialGoal.name.ilike(f'%{name}%'))  

    # Execute query
    results = query.all()
    return jsonify([goal.to_dict() for goal in results]), 200