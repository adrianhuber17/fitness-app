import unittest
import datetime
from backend.helper_files.helper_functions import total_elevation_gain_json,total_activities_monthly_json

#date and activity class to create mock input data for total_activities_monthly_json
class Date:
    def __init__(self,date):
        self.date= date
class Activity:
    def __init__(self):
        self.activities = []

    def add_activities(self,date):    
        self.activities.append(Date(date))

class Test(unittest.TestCase):

    # ---- tests for helper_functions: total_elevation_gain_json ----
   
    def test_total_elevation_gain_1(self):
        """Empty input"""
        activities_mock = []
        exepected_output = {}
        output = total_elevation_gain_json(activities_mock)
        self.assertEqual(output,exepected_output)

    def test_total_elevation_gain_2(self):
        """Same month input"""
        activities_mock = [{'date': datetime.datetime(2022, 6, 13, 12, 54, 29, 584855),
                            'elevation_gain': '1556.8'}, 
                            {'date': datetime.datetime(2022, 6, 13, 13, 2, 27, 876995), 
                            'elevation_gain': '4952.2'}]
        exepected_output = {2022:{6:6508}}
        output = total_elevation_gain_json(activities_mock)
        self.assertEqual(output,exepected_output)

    def test_total_elevation_gain_3(self):
        """Different month input"""
        activities_mock = [{'date': datetime.datetime(2022, 6, 13, 12, 54, 29, 584855),
                            'elevation_gain': '1556.8'}, 
                            {'date': datetime.datetime(2022, 7, 13, 13, 2, 27, 876995), 
                            'elevation_gain': '4952.2'},
                            {'date': datetime.datetime(2022, 10, 20, 13, 2, 27, 876995), 
                            'elevation_gain': '1000.23'}]
        exepected_output = {2022:{6:1556,7:4952,10:1000}}
        output = total_elevation_gain_json(activities_mock)
        self.assertEqual(output,exepected_output)

    def test_total_elevation_gain_4(self):
        """Different year same month input"""
        activities_mock = [{'date': datetime.datetime(2022, 6, 13, 12, 54, 29, 584855),
                            'elevation_gain': '1556.8'}, 
                            {'date': datetime.datetime(2022, 6, 13, 13, 2, 27, 876995), 
                            'elevation_gain': '4952.2'},
                            {'date': datetime.datetime(2023, 10, 13, 12, 54, 29, 584855),
                            'elevation_gain': '1556.8'},
                            {'date': datetime.datetime(2023, 10, 13, 13, 2, 27, 876995), 
                            'elevation_gain': '4952.2'}]
        exepected_output = {2022:{6:6508},2023:{10:6508}}
        output = total_elevation_gain_json(activities_mock)
        self.assertEqual(output,exepected_output)

    
    # ---- tests for helper_functions: total_activities_monthly_json ----

    def test_total_activities_monthly_json_1(self):
        """same month, same year activities"""
        activity_obj = Activity()
        activity_obj.add_activities(datetime.datetime(2022, 6, 13, 12, 54, 29, 584855))
        activity_obj.add_activities(datetime.datetime(2022, 6, 14, 12, 54, 29, 584855))
        activities_mock = activity_obj.activities
        output = total_activities_monthly_json(activities_mock)
        exepected_output = {2022:{6:2}}
        self.assertEqual(output,exepected_output)

    def test_total_activities_monthly_json_2(self):
        """no activities"""
        activity_obj = Activity()
        activities_mock = activity_obj.activities
        output = total_activities_monthly_json(activities_mock)
        exepected_output = {}
        self.assertEqual(output,exepected_output)

    def test_total_activities_monthly_json_3(self):
        """diff month, same year activities"""
        activity_obj = Activity()
        activity_obj.add_activities(datetime.datetime(2022, 6, 13, 12, 54, 29, 584855))
        activity_obj.add_activities(datetime.datetime(2022, 6, 13, 12, 54, 29, 584855))
        activity_obj.add_activities(datetime.datetime(2022, 7, 13, 12, 54, 29, 584855))
        activity_obj.add_activities(datetime.datetime(2022, 9, 13, 12, 54, 29, 584855))
        activity_obj.add_activities(datetime.datetime(2022, 9, 13, 12, 54, 29, 584855))
        activities_mock = activity_obj.activities
        output = total_activities_monthly_json(activities_mock)
        exepected_output = {2022:{6:2,7:1,9:2}}
        self.assertEqual(output,exepected_output)

    def test_total_activities_monthly_json_4(self):
        """diff month, diff year"""
        activity_obj = Activity()
        activity_obj.add_activities(datetime.datetime(2021, 6, 13, 12, 54, 29, 584855))
        activity_obj.add_activities(datetime.datetime(2021, 6, 13, 12, 54, 29, 584855))
        activity_obj.add_activities(datetime.datetime(2022, 7, 13, 12, 54, 29, 584855))
        activity_obj.add_activities(datetime.datetime(2023, 9, 13, 12, 54, 29, 584855))
        activity_obj.add_activities(datetime.datetime(2024, 9, 13, 12, 54, 29, 584855))
        activity_obj.add_activities(datetime.datetime(2024, 9, 13, 12, 54, 29, 584855))
        activities_mock = activity_obj.activities
        output = total_activities_monthly_json(activities_mock)
        exepected_output = {2021:{6:2},2022:{7:1},2023:{9:1},2024:{9:2}}
        self.assertEqual(output,exepected_output)

if __name__ == "__main__":
    unittest.main()

