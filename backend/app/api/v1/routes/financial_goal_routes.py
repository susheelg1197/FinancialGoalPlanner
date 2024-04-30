# app/api/v1/routes/financial_goal_routes.py

from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models.financial_goal import FinancialGoal

financial_goal_blueprint = Blueprint('financial_goals', __name__)

@financial_goal_blueprint.route('/financial_goals', methods=['POST'])
def create_financial_goal():
    data = request.get_json()
    new_goal = FinancialGoal(
        user_id=data['user_id'],
        name=data['name'],
        target_amount=data['target_amount'],
        deadline=data['deadline']
    )
    db.session.add(new_goal)
    db.session.commit()
    return jsonify(new_goal.to_dict()), 201

@financial_goal_blueprint.route('/financial_goals/<int:goal_id>', methods=['GET'])
def get_financial_goal(goal_id):
    goal = FinancialGoal.query.get(goal_id)
    if goal:
        return jsonify(goal.to_dict())
    return jsonify({'message': 'Financial goal not found'}), 404

@financial_goal_blueprint.route('/financial_goals', methods=['GET'])
def get_financial_goals():
    goals = FinancialGoal.query.all()
    return jsonify([goal.to_dict() for goal in goals])

@financial_goal_blueprint.route('/financial_goals/<int:goal_id>', methods=['PUT'])
def update_financial_goal(goal_id):
    goal = FinancialGoal.query.get(goal_id)
    if goal:
        data = request.get_json()
        goal.name = data.get('name', goal.name)
        goal.target_amount = data.get('target_amount', goal.target_amount)
        goal.deadline = data.get('deadline', goal.deadline)
        db.session.commit()
        return jsonify(goal.to_dict())
    return jsonify({'message': 'Financial goal not found'}), 404

@financial_goal_blueprint.route('/financial_goals/<int:goal_id>', methods=['DELETE'])
def delete_financial_goal(goal_id):
    goal = FinancialGoal.query.get(goal_id)
    if goal:
        db.session.delete(goal)
        db.session.commit()
        return jsonify({'message': 'Financial goal deleted'})
    return jsonify({'message': 'Financial goal not found'}), 404


@financial_goal_blueprint.route('/financial_goals/summary/<int:user_id>', methods=['GET'])
def get_financial_goals_summary(user_id):
    goals = FinancialGoal.query.filter_by(user_id=user_id).all()
    if not goals:
        return jsonify({'message': 'No financial goals found for this user'}), 404

    summary_data = []
    for goal in goals:
        progress_percentage = (goal.current_amount / goal.target_amount * 100) if goal.target_amount > 0 else 0
        summary_data.append({
            'goal_id': goal.id,
            'name': goal.name,
            'progress': round(progress_percentage, 2),
            'target_amount': float(goal.target_amount),
            'current_amount': float(goal.current_amount),
            'deadline': goal.deadline.isoformat(),
            'days_remaining': (goal.deadline - date.today()).days
        })

    return jsonify(summary_data)
