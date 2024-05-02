class Config:
    JWT_SECRET_KEY = 'jwtsecret'
    SQLALCHEMY_DATABASE_URI = 'postgresql://sgounder:sgounder@localhost/financialgoalplanner'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
