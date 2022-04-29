"""CRUD operations"""

from model import db, User, Activity, connect_to_db
from sqlalchemy import desc

#CRUD helper functions

def create_user(email,first_name,last_name,password):
    """Create and return a new user"""

    user = User(email=email, first_name=first_name,
                last_name=last_name, password=password)

    return user


def get_user_json(email):
    """Get a user JSON based on email"""
    user = db.session.query(User).filter_by(email=email).one()
    user_json = {'user_id':user.user_id,
                'email':user.email,
                'first_name': user.first_name,
                'last_name': user.last_name}
    return user_json

def get_other_user_data_json(user_id_user,other_user_id):
    """Get a user JSON based on userId"""
    
    user = db.session.query(User).filter_by(user_id=other_user_id).one()
    other_user_info = {'user_id':user.user_id,
                'email':user.email,
                'first_name': user.first_name,
                'last_name': user.last_name}
    
    latest_ride_object = db.session.query(Activity).filter_by(user_id = other_user_id).order_by(desc(Activity.date)).first()
    other_user_latest_act = None
    if latest_ride_object is not None:
        other_user_latest_act = latest_ride_object.activity_json

    is_user_following_other = is_following(user_id_user,other_user_id)
    
    other_user_data_json = {'userData':other_user_info,'userLatestRide':other_user_latest_act,'isFollowing':is_user_following_other}

    return other_user_data_json

def get_user(email):
    """get a User object"""

    user = db.session.query(User).filter_by(email=email).one()

    return user

def get_user_id(email):
    """get a User id"""

    user = db.session.query(User).filter_by(email=email).one()
    user_id = user.user_id

    return user_id

def get_all_users_list():
    """get a list of all users and ids [{'fullName':Adrian Huber,'userId':1}]"""
    users = db.session.query(User).all()

    users_list = []
    for user in users:
        first_name = user.first_name
        last_name = user.last_name
        full_name = first_name + ' ' + last_name
        user_id = user.user_id
        users_list.append({'fullName':full_name,'userId':user_id})

    return users_list

def get_followers(email):

    return

def is_user_correct(email):
    """Confirm if user exists based on an email"""

    is_email = db.session.query(User).filter_by(email=email).first()
    
    if is_email:
        return True
    return False

def is_password_correct(password):
    """confirms if a password for log in is correct"""

    is_password = db.session.query(User).filter_by(password=password).first()

    if is_password:
        return True
    return False


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
    
    return None

def follow_a_user(user_id_user,user_id_to_follow):
    """follow another user"""

    user = db.session.query(User).filter_by(user_id = user_id_user).one()
    to_follow = db.session.query(User).filter_by(user_id = user_id_to_follow).one()
    user.follower.append(to_follow)

    return user

def is_following(user_id_user,user_id_to_follow):
    """check if user is already following another user"""
    user_obj = db.session.query(User).filter_by(user_id = user_id_user).one()
    user_follows_list = user_obj.follower.all()
    if len(user_follows_list) == 0:
        return False
    else:
        is_user_following = user_obj.follower.filter_by(user_id = user_id_to_follow).first()
        if is_user_following == None:
            return False
        else:
            return True

def get_user_is_following(user_id):
    """get user following list"""

    user_obj = db.session.query(User).filter_by(user_id = user_id).one()
    following_list = user_obj.follower.all()
    
    following_info_list = []

    for following in following_list:
        following_info_list.append({
                            'userId':following.user_id,
                            'firstName':following.first_name,
                            'lastName':following.last_name,
                            'email':following.email,
        })

    return following_info_list

def unfollow_user(user_id,following_id):
    """unfollows a user and return user"""

    user = db.session.query(User).filter_by(user_id = user_id).one()
    user_to_unfollow = db.session.query(User).filter_by(user_id = following_id).one()
    user.follower.remove(user_to_unfollow)
    
    return user


if __name__ == '__main__':
    from server import app
    connect_to_db(app)