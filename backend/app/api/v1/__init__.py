from flask import Blueprint

v1_blueprint = Blueprint('v1', __name__)

from .routes import user_routes, financial_goal_routes, expense_routes, finance_routes, chatbot_routes

v1_blueprint.register_blueprint(user_routes.user_blueprint, url_prefix='/')
v1_blueprint.register_blueprint(financial_goal_routes.financial_goal_blueprint, url_prefix='/')
v1_blueprint.register_blueprint(expense_routes.expense_blueprint, url_prefix='/')
v1_blueprint.register_blueprint(finance_routes.finance_blueprint, url_prefix='/')
v1_blueprint.register_blueprint(chatbot_routes.chatbot_blueprint, url_prefix='/')

