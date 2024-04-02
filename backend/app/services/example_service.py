from app.repositories.example_repository import ExampleRepository

class ExampleService:
    @staticmethod
    def create_example(name):
        return ExampleRepository.create(name=name)
