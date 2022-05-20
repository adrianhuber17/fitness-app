from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.dialects.postgresql import JSON
from flask import Flask
from datetime import datetime

db = SQLAlchemy()

#many to many relationship table for followers
followers = db.Table('followers',
            db.Column('follower_id',db.Integer, db.ForeignKey('users.user_id')),
            db.Column('followee_id',db.Integer, db.ForeignKey('users.user_id')))

class User(db.Model):
    """User table"""

    __tablename__ = "users"

    user_id = db.Column(db.Integer, primary_key = True, autoincrement=True)
    email = db.Column(db.String(60), nullable = False,unique = True)
    first_name = db.Column(db.String(60), nullable = False)
    last_name = db.Column(db.String(60), nullable = False)
    password = db.Column(db.String(60), nullable = False)
    
    # activities = db.relationship("Activity", backref = 'user')

    follower = db.relationship('User',
                                secondary = followers,
                                primaryjoin=('followers.c.follower_id==User.user_id'),
                                secondaryjoin=('followers.c.followee_id==User.user_id'),
                                backref=db.backref('followers', lazy='dynamic'),
                                lazy='dynamic')

    def __repr__(self):
        return f"<User user_id: {self.user_id} user_email: {self.email}>"


class Activity(db.Model):
    """Activity table"""

    __tablename__ = "activities"

    activity_id = db.Column(db.Integer, primary_key = True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    date = db.Column(db.DateTime)
    ride_name = db.Column(db.String(300))
    ride_caption = db.Column(db.String(300))
    max_min_elevation_json = db.Column(JSON)
    elevation_gain_loss_json = db.Column(JSON)
    activity_json = db.Column(JSON)
    full_elevation_json = db.Column(JSON)

    user = db.relationship("User", backref = 'activities')

    def __repr__(self):
        return f"<Activity activity_id: {self.activity_id} user_id: {self.user_id}>"

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
    db.create_all() 
