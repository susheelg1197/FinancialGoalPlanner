# app/models/user.py

from app.extensions import db

class User(db.Model):
    __tablename__ = 'users'  # Name of the table in your database

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(128), unique=True, nullable=False)
    email = db.Column(db.String(128), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    # Add additional fields and relationships here

    def __repr__(self):
        return '<User {}>'.format(self.username)
