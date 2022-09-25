from flask_restx import Namespace,Resource
from flask import jsonify,session
from app.api import crud

get_user_nampespace = Namespace("get-user")

class GetUser(Resource):
    def get(self):
        user_json = crud.get_all_users_list()
    
        return jsonify(user_json)

get_user_nampespace.add_resource(GetUser,"")