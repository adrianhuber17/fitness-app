from flask_restx import Namespace,Resource
from flask import jsonify,session
from app.api import crud

user_data_nampespace = Namespace("user-data")

class UserData(Resource):
    def get(self):
        """returns a JSON with user data, and user following data"""

        # user data
        email = session['email']
        user_json = crud.get_user_json(email)
    
        user_id = crud.get_user_id(email)
        following_info_list = crud.get_user_is_following(user_id)
        follower_info_list = crud.get_user_followers(user_id)

        total_elevation_gain_json = crud.get_total_elevation_monthly(user_id)

        total_activities_monthly_json = crud.get_total_activities_monthly(user_id)

        userProfileJson = {'userData':user_json,
                        'followingData':following_info_list,
                        'followerData':follower_info_list,
                        'totalElevationGain': total_elevation_gain_json,
                        'totalActivites':total_activities_monthly_json}

        return jsonify(userProfileJson)

user_data_nampespace.add_resource(UserData,"")