
from datetime import time
import gpxpy
import gpxpy.gpx
import pandas as pd

"""
--- A few internal gpxpy functions to gather data ---
print(gpx) #GPX object
print(gpx.get_track_points_no()) # number of data points (containing lat,long,elev) -> 3778
print(gpx.get_elevation_extremes()) # altitude range -> MinimumMaximum(minimum=3.2, maximum=454.2)
print(gpx.get_uphill_downhill()) # elevation gained and lost -> UphillDownhill(uphill=494.65999999999934, downhill=482.05999999999773)
# print(gpx.to_xml()) -> display contents of gpx file in xml
# print(gpx.tracks[0]) -> check how many tracks the GPX file has
print(gpx.tracks[0].segments[0].points[0:10]) # the points array to access individual data points
"""
class gpxParser:

    """A gpx_parser class that helps parse .gpx files to JSON to 
    store in the database, and use in the front end"""

    def __init__(self):
        self.route_info = []
        self.route_info_json = None
        self.route_df = None
        self.center_latitude = None
        self.center_longitude = None
        self.coordinates = None
        self.map_json = None
        self.hr_stats_json = None
        self.elevation_stats_json = None

    def complete_gpx_parser_main(self,gpx_upload):

        """executes all the functions required to get attributes completed"""

        #--> functions needed to get the self.map_json attribute for map
        self.get_route_info_json(gpx_upload)
        self.route_info_df()
        self.get_center_latitude()
        self.get_center_longitude()
        self.get_coordinates_full_route()
        self.get_json_for_map()

        #--> functions needed to get heart_rate attribute, elevation extremes
        self.get_heart_rate_min_max_avg()
        self.get_elevation_extremes()

    def get_route_info_json(self,gpx_upload):
        """Parameter: .gpx file, Returns: a json with the route information"""

        with open(gpx_upload,'r') as gpx_file:
            gpx = gpxpy.parse(gpx_file)

        for track in gpx.tracks:
            for segment in track.segments:
                for point in segment.points:
                    if point.time:
                        time_ = point.time
                        time_conv = time_.strftime('%H:%M:%S')
                    else:
                        time_conv = '0'
                    power,hr,atemp,cad = '0','0','0','0'
                    for el in point.extensions:
                        if 'power' in el.tag:
                            power = el.text
                            continue
                        for inner_el in el:
                            if 'hr' in inner_el.tag:
                                hr = inner_el.text
                            if 'atemp' in inner_el.tag:
                                atemp = inner_el.text
                            if 'cad' in inner_el.tag:
                                cad = inner_el.text

                    self.route_info.append({
                        'latitude': point.latitude,
                        'longitude': point.longitude,
                        'elevation': point.elevation,
                        'time': time_conv,
                        'heart_rate':hr,
                        'temperature':atemp,
                        'cadence': cad,
                        'power':power
                    })

        self.route_info_json = {'route_data':self.route_info}
        
        return self.route_info_json

    def route_info_df(self):
        """Returns a Pandas DF of the route information"""

        values_of_route = self.route_info_json['route_data']
        self.route_df = pd.DataFrame(values_of_route)

        print(self.route_df)

        return self.route_df

    def get_center_latitude(self):

        """Returns the center latitude of the activity"""

        self.center_latitude = self.route_df['latitude'].mean()

        return self.center_latitude

    def get_center_longitude(self):

        """returns the center longitude of the activity"""

        self.center_longitude = self.route_df['longitude'].mean()

        return self.center_longitude

    def get_coordinates_full_route(self):

        """returns the coordinates as a list of tuples with [(lat,long)]"""
        
        self.coordinates = [tuple(x) for x in self.route_df[['latitude', 'longitude']].to_numpy()]
        
        return self.coordinates

    def get_json_for_map(self):
        """returns the json needed for the frot end and the database
        activity"""

        self.map_json = {'coordinates': self.coordinates,
                        'latitude': self.center_latitude,
                        'longitude': self.center_longitude}

    def get_heart_rate_min_max_avg(self):

        """returns a JSON with heart rate max,min, and average"""

        route_df_hr_int = self.route_df['heart_rate'].astype(int)
        min_hr = route_df_hr_int.min()
        max_hr = route_df_hr_int.max()
        avg_hr = route_df_hr_int.mean()

        self.hr_stats_json = {'max_heart_rate':max_hr,
                        'min_heart_rate':min_hr,
                        'average_heart_rate': avg_hr}
        
        return self.hr_stats_json

    def get_elevation_extremes(self):
        """returns a JSON with max, min elevation (altitude range)"""
        route_df_elevation_int = self.route_df['elevation'].astype(int)
        min_elevation_meters= route_df_elevation_int.min()
        max_elevation_meters = route_df_elevation_int.max()
        min_elevation_feet = min_elevation_meters * 3.28084
        max_elevation_feet = max_elevation_meters * 3.28084

        self.elevation_stats_json = {'extreme_elevation_meters':{'min_elevation_meters':min_elevation_meters,
                                                                'max_elevation_meters':max_elevation_meters},
                                    'extreme_elevation_feet':{'min_elevation_feet':min_elevation_feet,
                                                              'max_elevation_feet':max_elevation_feet}}

        return self.elevation_stats_json

#minimum=7.0, maximum=446.8
# print(gpx.get_elevation_extremes()) # altitude range -> MinimumMaximum(minimum=3.2, maximum=454.2)
# print(gpx.get_uphill_downhill()) # elevation gained and lost -> UphillDownhill(uphill=494.65999999999934, downhill=482.05999999999773)