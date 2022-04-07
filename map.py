
from datetime import time
import gpxpy
import gpxpy.gpx
import pandas as pd
import numpy as np


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

def get_route_info_json():
    with open('Morning_Ride.gpx','r') as gpx_file:
        gpx = gpxpy.parse(gpx_file)


    route_info = []

    for track in gpx.tracks:
        for segment in track.segments:
            for point in segment.points:
                time_ = point.time
                time_conv = time_.strftime('%H:%M:%S')
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

                route_info.append({
                    'latitude': point.latitude,
                    'longitude': point.longitude,
                    'elevation': point.elevation,
                    'time': time_conv,
                    'heart_rate':hr,
                    'temperature':atemp,
                    'cadence': cad,
                    'power':power
                })

    route_info_json = {'route_data':route_info}
    
    return route_info_json

def route_info_df(route_info_json):

    values_of_route = route_info_json['route_data']
    route_info_df = pd.DataFrame(values_of_route)

    return route_info_df

def get_center_latitude(route_info_df):

    center_latitude = route_info_df['latitude'].mean()

    return center_latitude

def get_center_longitude(route_info_df):

    center_longitude = route_info_df['longitude'].mean()

    return center_longitude

def get_coordinates_full_route(route_info_df):
    
    coordinates = [tuple(x) for x in route_info_df[['latitude', 'longitude']].to_numpy()]
    
    return coordinates






