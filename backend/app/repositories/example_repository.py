from app import db
from app.models.example_model import ExampleModel

class ExampleRepository:
    @staticmethod
    def create(name):
        example = ExampleModel(name=name)
        db.session.add(example)
        db.session.commit()
        return example
