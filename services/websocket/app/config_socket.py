import os

class BaseConfig:
    DEBUG = True
    TESTING = False
    SECRET_KEY = "secret"  # new
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    

# class DevelopmentConfig(BaseConfig):
#     SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL")