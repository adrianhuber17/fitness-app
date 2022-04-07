from flask import Flask, render_template,jsonify
import map

app = Flask(__name__)


@app.route('/')
def index():


    return render_template('index.html')

@app.route("/map.json")
def get_map_name():
    route_info_json = map.get_route_info_json()
    route_info_df = map.route_info_df(route_info_json)
    center_latitude = map.get_center_latitude(route_info_df)
    center_longitude = map.get_center_longitude(route_info_df)
    coordinates = map.get_coordinates_full_route(route_info_df)
    map_json = {'coordinates':coordinates,'latitude':center_latitude,'longitude':center_longitude}

    return jsonify(map_json)



if __name__ == "__main__":
  app.run(debug=True)