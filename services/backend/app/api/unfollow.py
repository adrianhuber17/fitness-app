from flask_restx import Namespace,Resource
from flask import jsonify,session,request
from app.api import crud
from app import db

unfollow_user_namespace = Namespace("unfollow-user")

class Unfollow(Resource):
    def post(self):
        """Post request to unfollow a user"""

        user_email = session['email']
        user_id = crud.get_user_id(user_email)

        post_data = request.get_json()
        following_id = post_data.get('userId')

        user_unfollowed = crud.unfollow_user(user_id,following_id)
        db.session.add(user_unfollowed)
        db.session.commit()

        unfollowedStatus = 'ok'
        print(f"current user -------------- {user_id}")
        print(f"other user -------------- {following_id}")
        print(f"unfollowedStatus -------------- {unfollowedStatus}")

        return jsonify({'unfollowStatus':unfollowedStatus})

unfollow_user_namespace.add_resource(Unfollow,"")