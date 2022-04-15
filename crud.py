"""CRUD operations"""

from model import db, User, Activity, connect_to_db
from sqlalchemy import desc

#CRUD helper functions

def create_user(email,first_name,last_name,password):
    """Create and return a new user"""

    user = User(email=email, first_name=first_name,
                last_name=last_name, password=password)

    return user

#add funtion for get user object by email
def get_user_json(email):
    """Get a user JSON based on email"""
    user = db.session.query(User).filter_by(email=email).one()
    user_json = {'user_id':user.user_id,
                'email':user.email,
                'first_name': user.first_name,
                'last_name': user.last_name}
    return user_json

def get_user(email):
    """get a User object"""

    user = db.session.query(User).filter_by(email=email).one()

    return user

def is_user_correct(email):
    """Confirm if user exists based on an email"""

    is_email = db.session.query(User).filter_by(email=email).first()
    
    if is_email:
        return True

def is_password_correct(password):
    """confirms if a password for log in is correct"""

    is_password = db.session.query(User).filter_by(password=password).first()

    if is_password:
        return True


def create_activity(user,date,ride_name,ride_caption,
                    max_min_elevation_json,
                    elevation_gain_loss_json,
                    activity_json):
    """Create and return a new activity"""

    activity = Activity(user=user,date=date,ride_name=ride_name,
                        ride_caption=ride_caption,
                        max_min_elevation_json=max_min_elevation_json,
                        elevation_gain_loss_json=elevation_gain_loss_json,
                        activity_json=activity_json)  

    return activity

def get_latest_activity(email):
    """Returns the latest activity JSON"""
    
    user_object = User.query.filter_by(email = email).first()
    user_id = user_object.user_id

    latest_ride_object = db.session.query(Activity).filter_by(user_id = user_id).order_by(desc(Activity.date)).first()
    if latest_ride_object is not None:
        latest_ride_json = latest_ride_object.activity_json
        return latest_ride_json
    else:
        return None

def follow_a_user(user_id_user,user_id_to_follow):
    """follow another user"""

    user = db.session.query(User).filter_by(user_id = user_id_user).one()
    to_follow = db.session.query(User).filter_by(user_id = user_id_to_follow).one()

    #def is_following(): check if user is following, if not add if they are then do not follow

    user.follower.append(to_follow)

    #this is to be added to the flask route. 
    # db.session.add(user)
    # db.session.commit()


#def is_following():
# Add a function to check if user is following another user.



if __name__ == '__main__':
    from server import app
    connect_to_db(app)