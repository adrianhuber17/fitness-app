from datetime import time
import gpxpy
import gpxpy.gpx
import pandas as pd
from time import strftime
from time import gmtime

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
        self.ride_date = None
        self.ride_name = None
        self.elevation_gain_loss_json = None
        self.elevation_full_route_json = None
        self.total_time = None
        self.total_distance = None

    def complete_gpx_parser_main(self,gpx_upload):

        """executes all the functions required to get attributes completed"""

        #--> functions needed to get the self.map_json attribute for map
        self.get_route_info_json(gpx_upload)
        self.route_info_df()
        self.get_center_latitude()
        self.get_center_longitude()
        self.get_coordinates_full_route()
        self.get_json_for_map()
        self.get_elevation_full_route_json()

        #--> functions needed to get heart_rate attribute, elevation extremes
        self.get_heart_rate_min_max_avg()
        self.get_elevation_extremes()

    def get_route_info_json(self,gpx_upload):
        """Parameter: .gpx file, Returns: a json with the route information"""

        gpx = gpxpy.parse(gpx_upload)

        duration_seconds = gpx.tracks[0].get_duration()
        self.get_total_time(duration_seconds)

        total_dist_meters = gpx.tracks[0].segments[0].length_3d()
        self.get_total_distance(total_dist_meters)

        self.ride_date = gpx.tracks[0].segments[0].points[0].time
        
        elevation_loss_meters_float = gpx.get_uphill_downhill().downhill
        elevation_gain_meters_float = gpx.get_uphill_downhill().uphill
        self.get_elevation_gain_loss_json(elevation_loss_meters_float,elevation_gain_meters_float)

        if gpx.tracks[0].name:
            self.ride_name = gpx.tracks[0].name
        else:
            self.ride_name = "Your Ride"

        for track in gpx.tracks:
            for segment in track.segments:
                for point in segment.points:
                    if point.time:
                        time_ = point.time
                        time_conv = time_.strftime('%H:%M:%S')
                    else:
                        time_ = '0'
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
                        'time_date_time': time_,
                        'time_conv': time_conv,
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
                        'longitude': self.center_longitude,
                        'totalTime': self.total_time,
                        'totalDistance':self.total_distance}


    def get_elevation_full_route_json(self):
        """return json with all elevation points in route"""

        elevation_list= [x for x in self.route_df[['elevation']].to_numpy()]
        elevation_list = []
      
        loop_count = len(self.route_df['elevation'])
        for el in range(0,loop_count,20):
            
            elevation_list.append(str(self.route_df['elevation'][el]))
       
        self.elevation_full_route_json = {'elevation':elevation_list}

        return self.elevation_full_route_json

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

        min_elevation_meters_str = str(min_elevation_meters)
        max_elevation_meters_str = str(max_elevation_meters)
        min_elevation_feet_str = str(min_elevation_feet)
        max_elevation_feet_str = str(max_elevation_feet)

        
        self.elevation_stats_json = {'extreme_elevation_meters':{'min_elevation_meters':min_elevation_meters_str,
                                                                'max_elevation_meters':max_elevation_meters_str},
                                    'extreme_elevation_feet':{'min_elevation_feet':min_elevation_feet_str,
                                                              'max_elevation_feet':max_elevation_feet_str}}
                                                              
        return self.elevation_stats_json

    def get_elevation_gain_loss_json(self,elevation_loss_meters_float,elevation_gain_meters_float):
        elevation_loss_meters = str(round(elevation_loss_meters_float,1))
        elevation_gain_meters = str(round(elevation_gain_meters_float,1))
        elevation_loss_feet = str(round(elevation_loss_meters_float * 3.28084,1))
        elevation_gain_feet = str(round(elevation_gain_meters_float * 3.28084,1))

        self.elevation_gain_loss_json = {'elevation_loss_meters':elevation_loss_meters,
                                    'elevation_gain_meters':elevation_gain_meters,
                                    'elevation_loss_feet':elevation_loss_feet,
                                    'elevation_gain_feet':elevation_gain_feet}
        return self.elevation_gain_loss_json
    
    def get_total_time(self,duration_seconds):
        """gets total time and returns a string hour:minute:second or None"""
        if duration_seconds is None:
            return None
        
        self.total_time = strftime("%H:%M:%S", gmtime(duration_seconds))
        return self.total_time

    def get_total_distance(self,total_dist_meters):
        """gets total distance in km and mi or return None"""
        
        if total_dist_meters is None:
            return None
        
        total_dist_km_str = str(round(total_dist_meters/1000,1))
        total_dist_mi_str = str(round((total_dist_meters/1000)/1.6,1))

        self.total_distance = {'km':total_dist_km_str,'mi':total_dist_mi_str}

        return self.total_distance