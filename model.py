from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import JSON
from flask import Flask

db = SQLAlchemy()

class User(db.Model):
    """User table"""

    __tablename__ = "users"

    user_id = db.Column(db.Integer, primary_key = True, autoincrement=True)
    email = db.Column(db.String(60), nullable = False,unique = True)
    first_name = db.Column(db.String(60), nullable = False)
    last_name = db.Column(db.String(60), nullable = False)
    password = db.Column(db.String(60), nullable = False)
    
    #activities = a list of Activity objects
    #followers = a list of Follow objects

    def __repr__(self):
        return f"<User user_id: {self.user_id} user_email: {self.email}>"

class Activity(db.Model):
    """Activity table"""

    __tablename__ = "activities"

    activity_id = db.Column(db.Integer, primary_key = True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    date = db.Column(db.DateTime)
    ride_name = db.Column(db.String(60))
    ride_caption = db.Column(db.String(60))
    elevation_gain = db.Column(db.Integer)
    elevation_loss = db.Column(db.Integer)
    activity_json = db.Column(JSON)

    user = db.relationship("User", backref='activities')

    def __repr__(self):
        return f"<Activity activity_id: {self.activity_id} user_id: {self.user_id}>"

class Follow(db.Model):
    """Followers table"""

    __tablename__ = "followers"

    id = db.Column(db.Integer, primary_key = True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    follow_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    time_followed = db.Column(db.DateTime)

    user = db.relationship("User", backref='followers')

    def __repr__(self):
        return f"<Follow id = {self.id} user_id = {self.user_id} follow_id = {self.follow_id}>"

def connect_to_db(app):
    """connect to the database"""

    app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql:///fitness_app"
    app.config["SQLALCHEMY_ECHO"] = True
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = app
    db.init_app(app)

if __name__ == "__main__":
    from server import app

    connect_to_db(app)
    print("Successfully connected to the database")
    # db.create_all() -> only used to create database from scratch
