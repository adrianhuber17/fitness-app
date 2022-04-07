from flask import Flask, render_template,jsonify
from gpx_parser import gpxParser

app = Flask(__name__)


@app.route('/')
def index():


    return render_template('index.html')

@app.route("/map.json")
def get_map_name():

    gpx_file_test = 'Morning_Ride.gpx'
    activity = gpxParser()
    activity.get_route_info_json(gpx_file_test)
    activity.route_info_df()
    get_activity_center_lat = activity.get_center_latitude()
    get_activity_center_long = activity.get_center_longitude()
    get_activity_coordinates = activity.get_coordinates_full_route()

    map_json = {'coordinates':get_activity_coordinates,
                'latitude':get_activity_center_lat,
                'longitude':get_activity_center_long}

    return jsonify(map_json)



if __name__ == "__main__":
  app.run(debug=True)