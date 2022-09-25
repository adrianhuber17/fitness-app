from flask_restx import Namespace,Resource
from flask import jsonify,session,request
from app.api import crud
from app import db

follow_user_namespace = Namespace("follow-user")

class Follow(Resource):
    def post(self):
        """Post request to follow another user"""

        #logged in user Data
        user_email = session['email']
        user_id_user = crud.get_user_id(user_email)

        #Other user Data
        post_data = request.get_json()
        user_id_to_follow = post_data.get('userId')

        follow_user = crud.follow_a_user(user_id_user,user_id_to_follow)
        db.session.add(follow_user)
        db.session.commit()

        followedStatus = 'ok'
        print(f"current user -------------- {user_id_user}")
        print(f"other user -------------- {user_id_to_follow}")
        print(f"followedStatus -------------- {followedStatus}")

        return jsonify({'followStatus':followedStatus})

follow_user_namespace.add_resource(Follow,"")