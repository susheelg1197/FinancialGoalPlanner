from app.extensions import db
from datetime import datetime

class Expense(db.Model):
    __tablename__ = 'expenses'

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(128), nullable=False)
    title = db.Column(db.String(128), nullable=False)
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    created_on = db.Column(db.DateTime, default=datetime.utcnow)
    created_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def to_dict(self):
        return {
            'expenseId': self.id,
            'category': self.category,
            'title': self.title,
            'amount': float(self.amount),
            'createdOn': self.created_on.isoformat(),
            'createdBy': self.created_by
        }
