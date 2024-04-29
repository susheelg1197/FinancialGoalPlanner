# app/models/users.py

from app.extensions import db

class User(db.Model):
    __tablename__ = 'users'  # Name of the table in your database

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(128), unique=True, nullable=False)
    email = db.Column(db.String(128), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)

    # Add additional fields and relationships here
    # Relationship back to FinancialGoal
    financial_goals = db.relationship('FinancialGoal', back_populates='user')


    def __repr__(self):
        return '<User {}>'.format(self.username)
    
    def to_dict(self):
        """Return a dictionary with user's public data."""
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
            # Do not include the password_hash or any sensitive data!
        }

