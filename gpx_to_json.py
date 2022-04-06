
from datetime import time
import gpxpy
import gpxpy.gpx
import pandas as pd
import matplotlib.pyplot as plt

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
with open('Afternoon_Ride.gpx','r') as gpx_file:
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
print(route_info_json)

# route_df = pd.DataFrame(route_info)
# print(route_df)



# plt.figure(1,figsize=(14,8))
# plt.scatter(route_df['longitude'],route_df['latitude'],color='#101010')
# plt.title('Route latitude and longitude points', size=20)

# plt.figure(2,figsize=(14,8))
# plt.scatter(power_df['power'],power_df['power'],color='blue')
# plt.title('Power plot', size=20)

# plt.figure(3,figsize=(14,8))
# plt.scatter(hr_df['hr'],hr_df['hr'],color='red')
# plt.title('Heart Rate plot', size=20)

# plt.show()

