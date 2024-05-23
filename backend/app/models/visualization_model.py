from app.extensions import db
from datetime import datetime

class Category(db.Model):
    __tablename__ = 'categories'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    metrics = db.relationship('Metric', backref='category', lazy=True)

    def __repr__(self):
        return f"<Category {self.name}>"

class Metric(db.Model):
    __tablename__ = 'metrics'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    data_points = db.relationship('DataPoint', backref='metric', lazy=True)

    def __repr__(self):
        return f"<Metric {self.name}>"

class DataPoint(db.Model):
    __tablename__ = 'data_points'
    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.Float, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    metric_id = db.Column(db.Integer, db.ForeignKey('metrics.id'), nullable=False)

    def __repr__(self):
        return f"<DataPoint {self.value} at {self.timestamp}>"
