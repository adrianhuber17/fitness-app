import datetime
 
activities = [{'date': datetime.datetime(2022, 5, 12, 16, 25, 29, 864506), 'elevation_gain': '1544.2913879999912'}, 
            {'date': datetime.datetime(2022, 5, 14, 16, 38, 53, 774264), 'elevation_gain': '1533.4646159999938'},
            {'date': datetime.datetime(2023, 3, 14, 16, 38, 53, 774264), 'elevation_gain': '1533.4646159999938'},
            {'date': datetime.datetime(2021,7, 14, 16, 38, 53, 774264), 'elevation_gain': '1533.4646159999938'},
            {'date': datetime.datetime(2022,7, 14, 16, 38, 53, 774264), 'elevation_gain': '1533.4646159999938'},
            {'date': datetime.datetime(2022,7, 14, 16, 38, 53, 774264), 'elevation_gain': '1533.4646159999938'},
            {'date': datetime.datetime(2022,7, 14, 16, 38, 53, 774264), 'elevation_gain': '1533.4646159999938'}]

def total_elevation_gain_json(activities):
    """gets a list of dicts as a parameter, returns json with total elevation gain per month"""
    total_elevation_json = {}
    for activity in activities:
        activity_year = activity['date'].year
        activity_month = activity['date'].month
        
    
    print(total_elevation_json)

    # return total_elevation_json


total_elevation_gain_json(activities)


# {2022:{1:{},2:{},3:{},4:{}},2023:{}}