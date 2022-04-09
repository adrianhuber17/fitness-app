"""CRUD operations"""

from model import db, User, Activity, connect_to_db

#CRUD helper functions

def create_user(email,first_name,last_name,password):
    """Create and return a new user"""

    user = User(email=email, first_name=first_name,
                last_name=last_name, password=password)

    return user

def create_activity(user,date,ride_name,ride_caption,max_elevation,
                    min_elevation, activity_json):
    """Create and return a new activity"""

    activity = Activity(user=user,date=date,ride_name=ride_name,ride_caption=ride_caption,
                        max_elevation=max_elevation,min_elevation=min_elevation,
                        activity_json=activity_json)  

    return activity

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

#add funtion for get user object by id

if __name__ == '__main__':
    from server import app
    connect_to_db(app)