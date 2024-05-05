from datetime import datetime, timedelta
from app.models.financial_goal import FinancialGoal
from flask_jwt_extended import get_jwt_identity
from app.models.expense import Expense
from app.extensions import db
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.utils.utils import get_user_id_from_token 
from sqlalchemy import func, extract


import random

responses = {
    "balance": "Your current balance is $3,520.",
    "budget tips": "Consider reviewing your subscriptions and cutting unnecessary spending.",
    "savings advice": "Automating your savings can help you reach your financial goals faster."
}


chatbot_blueprint = Blueprint('chatbot', __name__)

@chatbot_blueprint.route('/chat', methods=['POST'])
@jwt_required()
def chat():
    user_id = user_id = get_user_id_from_token()
    if not user_id:
        return jsonify({'error': 'User not authenticated'}), 401
    user_input = request.json.get('message', '').lower()

    intent, context = determine_intent(user_input)

    # Handling different types of user queries
    if 'latest expense' in user_input:
        return jsonify({'response': get_latest_expense(user_id)})
    elif 'expense this month' in user_input:
        return jsonify({'response': get_monthly_expenses(user_id)})
    elif 'financial goal' in user_input:
        return jsonify({'response': get_financial_goals(user_id)})
    elif 'give monthly comparison' in user_input:
        return jsonify({'response': get_monthly_comparison(user_id)})
    elif intent == 'detailed_expense_report':
        return jsonify({'response' : get_detailed_expense_report(user_id)})
    elif intent == 'upcoming_goals':
        return jsonify({'response': get_upcoming_goals(user_id)})
    # elif intent == 'goal_progress':
    #     # Extract goal name from context, for example using simple string manipulation or regex
    #     goal_name = extract_goal_name(context)  # Implement this function based on your expected input format
    #     return jsonify(get_goal_progress(user_id, goal_name))
    elif intent == 'budget_suggestions':
        return jsonify(suggest_budget_cuts(user_id))

    else:
        return jsonify({'response': "I'm here to help with your financial queries. Please ask about expenses, goals, or financial summaries."})


def get_latest_expense(user_id):
    expense = Expense.query.filter_by(created_by=user_id).order_by(Expense.created_on.desc()).first()
    if expense:
        response = f"Your latest expense was ${expense.amount} for {expense.category} on {expense.created_on.strftime('%Y-%m-%d')}."
    else:
        response = "You have no recorded expenses."
    return response

def get_monthly_expenses(user_id):
    start_date = datetime.now().replace(day=1)
    total_expense = db.session.query(func.sum(Expense.amount)).filter(Expense.created_by == user_id, Expense.created_on >= start_date).scalar()
    return f"Your total expenses this month are ${total_expense if total_expense else 0}."

def get_financial_goals(user_id):
    goals = FinancialGoal.query.filter_by(user_id=user_id).all()
    if goals:
        goal_details = ', '.join([f"{goal.name} (${goal.current_amount} of ${goal.target_amount})" for goal in goals])
        response = f"Your financial goals are: {goal_details}"
    else:
        response = "You have no current financial goals set."
    return response

def get_monthly_comparison(user_id):
    current_month = datetime.now().month
    last_month = (datetime.now() - timedelta(days=30)).month
    current_month_expense = db.session.query(func.sum(Expense.amount)).filter(Expense.created_by == user_id, extract('month', Expense.created_on) == current_month).scalar()
    last_month_expense = db.session.query(func.sum(Expense.amount)).filter(Expense.created_by == user_id, extract('month', Expense.created_on) == last_month).scalar()
    
    response = f"Your expenses in the current month: ${current_month_expense if current_month_expense else 0}. "
    response += f"Last month: ${last_month_expense if last_month_expense else 0}."
    
    if current_month_expense and last_month_expense:
        change = ((current_month_expense - last_month_expense) / last_month_expense) * 100
        response += f" This is a {'decrease' if change < 0 else 'increase'} of {abs(change):.2f}% compared to last month."
    return response


from datetime import datetime, timedelta
from sqlalchemy import func, extract

def get_detailed_expense_report(user_id):
    last_month = (datetime.now() - timedelta(days=30)).month
    expenses = Expense.query.filter(
        Expense.created_by == user_id,
        extract('month', Expense.created_on) == last_month
    ).all()

    categorized_expenses = {}
    for expense in expenses:
        if expense.category not in categorized_expenses:
            categorized_expenses[expense.category] = 0
        categorized_expenses[expense.category] += float(expense.amount)

    return categorized_expenses

def get_upcoming_goals(user_id):
    today = datetime.now().date()
    upcoming_goals = FinancialGoal.query.filter(
        FinancialGoal.user_id == user_id,
        FinancialGoal.end_date >= today
    ).order_by(FinancialGoal.end_date).all()

    goals_info = [{
        'name': goal.name,
        'target_amount': float(goal.target_amount),
        'current_amount': float(goal.current_amount),
        'end_date': goal.end_date.isoformat()
    } for goal in upcoming_goals]

    return goals_info

def get_goal_progress(user_id, goal_name):
    goal = FinancialGoal.query.filter_by(
        user_id=user_id,
        name=goal_name
    ).first()

    if goal:
        progress = (float(goal.current_amount) / float(goal.target_amount)) * 100
        return {'name': goal_name, 'progress': f"{progress:.2f}%"}
    else:
        return {'error': 'Goal not found'}

def suggest_budget_cuts(user_id):
    last_month_expenses = get_detailed_expense_report(user_id)
    high_expenses = {category: amount for category, amount in last_month_expenses.items() if amount > 500}  # arbitrary threshold

    suggestions = {}
    for category, amount in high_expenses.items():
        suggestions[category] = f"Consider reducing expenses in {category}, which were unusually high at ${amount:.2f} last month."

    return suggestions

def determine_intent(user_input):
    user_input = user_input.lower()
    
    # Checks if the input matches common queries about expenses
    if any(keyword in user_input for keyword in ["expense report", "expenses last month"]):
        return 'detailed_expense_report', None
    
    # Checks if the input is about upcoming financial goals
    elif any(keyword in user_input for keyword in ["upcoming goals", "future goals"]):
        return 'upcoming_goals', None
    
    # Checks if the input is asking for progress on a specific financial goal
    elif "progress" in user_input and "goal" in user_input:
        return 'goal_progress', user_input
    
    # Checks if the input is related to budgeting suggestions
    elif any(keyword in user_input for keyword in ["budget", "reduce spending", "cut costs"]):
        return 'budget_suggestions', None
    
    # Default return if no intent is determined
    return None, None

import re

def extract_goal_name(user_input):
    # Example using a simple regex to capture phrases following "goal" or "progress on"
    match = re.search(r'goal\s+(\w+)|progress on\s+(\w+)', user_input)
    if match:
        return match.group(1) or match.group(2)
    return ""
