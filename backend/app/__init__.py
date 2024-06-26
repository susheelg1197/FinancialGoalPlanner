from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_utils import database_exists, create_database
from flask_migrate import Migrate
from config import Config
from .extensions import db, migrate  # Import from your extensions module
from flask_jwt_extended import JWTManager
from flask_cors import CORS


# db = SQLAlchemy()
# migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    jwt = JWTManager(app)
    CORS(app)

    db.init_app(app)
    migrate.init_app(app, db)

    # Ensure the database exists
    if not database_exists(app.config['SQLALCHEMY_DATABASE_URI']):
        create_database(app.config['SQLALCHEMY_DATABASE_URI'])
        print("Database created.")

    # Import and register blueprints
    from app.api.v1 import v1_blueprint as api_v1_blueprint
    app.register_blueprint(api_v1_blueprint, url_prefix='/api/v1')

    return app
