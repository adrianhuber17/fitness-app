
from flask_restx import Namespace,Resource,cors
from flask import jsonify,session
from app.api import crud
import os

friend_feed_nampespace = Namespace("friend-feed")

class FriendFeed(Resource):
    def get(self):
        user_email = session.get('email')
        following_activities=[]
        if user_email:
            user_id = crud.get_user_id(user_email)
            following_activities = crud.following_activity_json(user_id)
        response = jsonify(following_activities)
        return response

friend_feed_nampespace.add_resource(FriendFeed,"")