from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_utils import database_exists, create_database
from flask_migrate import Migrate
from config import Config

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)

    # Ensure the database exists
    if not database_exists(app.config['SQLALCHEMY_DATABASE_URI']):
        create_database(app.config['SQLALCHEMY_DATABASE_URI'])
        print("Database created.")

    # Import and register blueprints
    from app.api.routes import default_blueprint
    app.register_blueprint(default_blueprint)


    from app.views.example_view import example_blueprint
    app.register_blueprint(example_blueprint)

    return app
