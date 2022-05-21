import datetime
 
def total_elevation_gain_json(activities):
    """gets a list of dicts as a parameter, returns json with total elevation gain per month"""
    total_elevation_json = {}
    initial_feet_climbed = 0
    for activity in activities:
        print(activity)
        activity_year = activity['date'].year
        activity_month = activity['date'].month
        feet_climbed = float(activity['elevation_gain'])

        if activity_year not in total_elevation_json.keys():
            total_elevation_json[activity_year] = {}

        if activity_month not in total_elevation_json[activity_year].keys():
            total_elevation_json[activity_year][activity_month] = initial_feet_climbed
    
        total_elevation_json[activity_year][activity_month] = int(total_elevation_json[activity_year][activity_month] + feet_climbed)
    
    return total_elevation_json

def total_activities_monthly_json(activities):
    
    total_activities_json = {}
    initial_activity_count = 0

    for activity in activities:
        activity_year = activity.date.year
        activity_month = activity.date.month

        if activity_year not in total_activities_json.keys():
            total_activities_json[activity_year] = {}

        if activity_month not in total_activities_json[activity_year].keys():
            total_activities_json[activity_year][activity_month] = initial_activity_count
        
        total_activities_json[activity_year][activity_month] = total_activities_json[activity_year][activity_month] + 1

    return total_activities_json