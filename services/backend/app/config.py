# app/config.py

import os

class BaseConfig:
    FLASK_ENV='development'
    DEBUG = False
    TESTING = False
    SECRET_KEY = 'secret'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = False
    FLASK_RUN_PORT=5001

class DevelopmentConfig(BaseConfig):
    SQLALCHEMY_DATABASE_URI = 'postgresql:///fitness_app'
    print(SQLALCHEMY_DATABASE_URI)

class TestingConfig(BaseConfig):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_TEST_URL")


class ProductionConfig(BaseConfig):
    url = os.environ.get("DATABASE_URL")

    if url is not None and url.startswith("postgres://"):
        url = url.replace("postgres://", "postgresql://", 1)

    SQLALCHEMY_DATABASE_URI = url

class BaseConfigSocket:
    FLASK_ENV='development'
    DEBUG = False
    TESTING = False
    SECRET_KEY = 'secret'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = False


class DevelopmentConfig(BaseConfigSocket):
    SQLALCHEMY_DATABASE_URI = 'postgresql:///fitness_app'
    print(SQLALCHEMY_DATABASE_URI)

class TestingConfig(BaseConfigSocket):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_TEST_URL")


class ProductionConfig(BaseConfigSocket):
    url = os.environ.get("DATABASE_URL")

    if url is not None and url.startswith("postgres://"):
        url = url.replace("postgres://", "postgresql://", 1)

    SQLALCHEMY_DATABASE_URI = url