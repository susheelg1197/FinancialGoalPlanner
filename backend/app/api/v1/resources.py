from . import blueprint
from flask import jsonify

@blueprint.route('/goals', methods=['GET'])
def list_goals():
    # Placeholder function to list goals
    return jsonify([])
