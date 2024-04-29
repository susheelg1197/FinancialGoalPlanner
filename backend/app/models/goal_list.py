# app/models/financial_goal.py

from app.extensions import db

class FinancialGoal(db.Model):
    __tablename__ = 'goal_lis'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    goalname = db.Column(db.String(128), nullable=False)
    target_amount = db.Column(db.Numeric(10, 2), nullable=False)
    deadline = db.Column(db.Date, nullable=False)

    # relationships
    user = db.relationship('User', back_populates='financial_goals')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'gaolname': self.goalname,
            'target_amount': str(self.target_amount),  # Convert to string for JSON serialization
            'deadline': self.deadline.isoformat()  # Convert to ISO format string
        }
