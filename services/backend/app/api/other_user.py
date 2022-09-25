from flask_restx import Namespace,Resource
from flask import jsonify,session,request
from app.api import crud


other_user_namespace = Namespace("other-user")

class OtherUser(Resource):
    def post(self):
         #logged in user Data
        user_email = session['email']
        user_id_user = crud.get_user_id(user_email)
        #Other user Data
        post_data = request.get_json()
        other_user_id = post_data.get('userId')
        otherUserDataJson = crud.get_other_user_data_json(user_id_user,other_user_id)
        
        return jsonify(otherUserDataJson)

other_user_namespace.add_resource(OtherUser,"")