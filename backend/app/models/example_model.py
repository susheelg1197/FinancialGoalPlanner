from app import db

class ExampleModel(db.Model):
    __tablename__ = 'examples'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), nullable=False)

class FinancialGoal(db.Model):
    __tablename__ = 'financial_goals'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    description = db.Column(db.String(256))
