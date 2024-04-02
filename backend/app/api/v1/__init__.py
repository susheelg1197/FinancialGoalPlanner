from flask import Blueprint

blueprint = Blueprint('api_v1', __name__)

from . import resources
