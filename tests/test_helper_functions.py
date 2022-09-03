import unittest
from backend.helper_functions import total_activities_monthly_json,total_elevation_gain_json

class Test(unittest.TestCase):

    def test_total_elevation_gain_1(self):

        activities_mock = {}
        exepected_output = {}
        output = total_elevation_gain_json(activities_mock)
        self.assertEqual(output,exepected_output)

    def test_total_elevation_gain_2(self):

        activities_mock = {}
        exepected_output = {}
        output = total_elevation_gain_json(activities_mock)
        self.assertEqual(output,exepected_output)

    def test_total_elevation_gain_3(self):
        activities_mock = {}
        exepected_output = {}
        output = total_elevation_gain_json(activities_mock)
        self.assertEqual(output,exepected_output)

    def test_total_activities_monthly_1(self):
        activities_mock = {}
        exepected_output = {}
        output = total_activities_monthly_json(activities_mock)
        self.assertEqual(output,exepected_output)


if __name__ == "__main__":
    unittest.main()

