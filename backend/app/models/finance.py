from app.extensions import db
from datetime import datetime

class Finance(db.Model):
    __tablename__ = 'finances'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(128), nullable=False)
    description = db.Column(db.Text, nullable=True)
    created_on = db.Column(db.DateTime, default=datetime.utcnow)
    created_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    type = db.Column(db.String(128), nullable=False)  

    def to_dict(self):
        return {
            'financeId': self.id,
            'title': self.title,
            'description': self.description,
            'createdOn': self.created_on.isoformat(),
            'createdBy': self.created_by,
            'amount': float(self.amount),
            'type': self.type
        }
