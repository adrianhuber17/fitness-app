"""CRUD operations"""

from app.db import db
from app.model import User, Activity
from sqlalchemy import desc
#CRUD helper functions

def get_user_followers(user_id):
    """return user's follower list"""
    user_obj = db.session.query(User).filter_by(user_id = user_id).one()
    follower_list = user_obj.followers

    followers_info_list = []
    for follower in follower_list:
        followers_info_list.append({
                            'userId':follower.user_id,
                            'firstName':follower.first_name,
                            'lastName':follower.last_name,
                            'email':follower.email,
        })

    return followers_info_list