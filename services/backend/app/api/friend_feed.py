from flask_restx import Namespace,Resource
from flask import jsonify,session
from app.api import crud

friend_feed_nampespace = Namespace("friend-feed")

class FriendFeed(Resource):
    def get(self):

        user_email = session['email']
        user_id = crud.get_user_id(user_email)
        print(user_email)
        following_activities = crud.following_activity_json(user_id)

        return jsonify(following_activities)

friend_feed_nampespace.add_resource(FriendFeed,"")