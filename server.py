from flask import Flask, render_template,jsonify
from gpx_parser import gpxParser

app = Flask(__name__)


@app.route('/')
def index():


    return render_template('index.html')

@app.route("/map.json")
def get_activity_map_data():
    """"""
    gpx_file_test = 'Camilo_Ride.gpx'
    activity = gpxParser()
    activity.complete_gpx_parser_main(gpx_file_test)

    return jsonify(activity.map_json)



if __name__ == "__main__":
    from model import connect_to_db

    connect_to_db(app)
    app.run(debug=True)