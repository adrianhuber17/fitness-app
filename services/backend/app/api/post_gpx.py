from flask_restx import Namespace,Resource
from flask import jsonify,session,request
from app.api import crud
from app import db
from app.helper_files.gpx_parser import gpxParser
from datetime import datetime

post_gpx_namespace = Namespace("post-gpx")

class PostGpx(Resource):
    def post(self):
        # User in session
        email = session['email']
        user = crud.get_user(email)

        # User ride caption
        ride_caption = request.form.get('ride-caption')

        # User Activity transfer
        file_transfer_object = request.files.get('file')
        encoded_json_file = file_transfer_object.stream.read()
        gpx_file = encoded_json_file.decode('utf-8')
        activity = gpxParser()
        activity.complete_gpx_parser_main(gpx_file)
        
        # Activity Details
        elevation_gain_loss_json = activity.elevation_gain_loss_json
        max_min_elevation_json = activity.elevation_stats_json
        activity_json = activity.map_json
        full_elevation_json = activity.elevation_full_route_json
        # date = activity.ride_date
        date = datetime.now()
        ride_name = activity.ride_name
        activity = crud.create_activity(user,date,ride_name,
                                        ride_caption,max_min_elevation_json,
                                        elevation_gain_loss_json,activity_json,full_elevation_json)
        db.session.add(activity)
        db.session.commit()
        
        latest_activity_json_map = crud.get_latest_activity(email)

        return jsonify(latest_activity_json_map)


post_gpx_namespace.add_resource(PostGpx,"")