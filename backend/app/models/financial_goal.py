from datetime import datetime
from app.extensions import db

class FinancialGoal(db.Model):
    __tablename__ = 'financial_goals'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(128), nullable=False)
    description = db.Column(db.Text, nullable=True)
    created_by = db.Column(db.String(128), nullable=True)
    created_on = db.Column(db.DateTime, default=datetime.utcnow)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    current_amount = db.Column(db.Numeric(10, 2), nullable=False)
    target_amount = db.Column(db.Numeric(10, 2), nullable=False)
    category = db.Column(db.String(128), nullable=True)
    status = db.Column(db.String(128), nullable=True)

    # relationships
    user = db.relationship('User', back_populates='financial_goals')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'description': self.description,
            'created_by': self.created_by,
            'created_on': self.created_on.isoformat() if self.created_on else None,
            'start_date': self.start_date.isoformat() if self.start_date else None,
            'end_date': self.end_date.isoformat() if self.end_date else None,
            'current_amount': str(self.current_amount),
            'target_amount': str(self.target_amount),
            'category': self.category,
            'status': self.status
        }
