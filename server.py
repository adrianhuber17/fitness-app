from flask import Flask, render_template,jsonify, session
import os
from gpx_parser import gpxParser

app = Flask(__name__)
SECRET_KEY = os.environ['APP_KEY']
app.secret_key = SECRET_KEY


@app.route('/')
def index():
    """homepage route"""


    return render_template('index.html')

@app.route("/map.json")
def get_activity_map_data():
    """endpoint with cordinates JSON for the map"""
    gpx_file_test = 'Camilo_Ride.gpx'
    activity = gpxParser()
    activity.complete_gpx_parser_main(gpx_file_test)

    return jsonify(activity.map_json)



if __name__ == "__main__":
    from model import connect_to_db

    connect_to_db(app)
    app.run(debug=True)