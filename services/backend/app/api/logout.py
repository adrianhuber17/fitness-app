from flask_restx import Namespace,Resource
from flask import session,jsonify

logout_namespace = Namespace("logout")

class Logout(Resource):
    def get(self):
        """logs user out and clears the session"""
        print(session)
        session.clear()
        print(session)
        return jsonify({'status':'ok'})

logout_namespace.add_resource(Logout,"")