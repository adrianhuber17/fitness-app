from flask_restx import Namespace,Resource
from flask import jsonify,session
from app.api import crud

map_nampespace = Namespace("map")

class Map(Resource):
    def get(self):
        email = session['email']

        latest_activity_json_map = crud.get_latest_activity(email)

        return jsonify(latest_activity_json_map)

map_nampespace.add_resource(Map,"")