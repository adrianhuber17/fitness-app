from flask_restx import Namespace,Resource
from flask import jsonify,session
from app.api import crud

session_nampespace = Namespace("session")

class Session(Resource):
    def get(self):
        if 'email' in session.keys():
            email = session['email']
            user_json = crud.get_user_json(email)
            return jsonify({'email':email, 'userData':user_json})
        else:
            return jsonify({'email':None})

session_nampespace.add_resource(Session,"")