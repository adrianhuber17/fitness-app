import unittest
from backend.server.server import *
from backend.database_model import model
from backend.helper_files import crud
import json

class Test_1(unittest.TestCase):

    def setUp(self):
        app.config['TESTING'] = True
        app.config['SECRET_KEY'] = os.environ['APP_KEY']
        self.client = app.test_client()
        

        # Connect to test database
        model.connect_to_db(app)
        model.db.drop_all()
        # Create tables and add sample data
        model.db.create_all()
        self.example_data()

        with self.client.session_transaction() as sess:
            sess['email'] = 'test@gmail.com'
            sess['password'] = 'a230591h'


    def example_data(self):
        """Create some sample data."""

        # Add sample users
        user_1 = model.User(user_id=1, email='test@gmail.com', first_name='adrian',
                        last_name = 'huber',password = 'a230591h')
        user_2 = model.User(user_id=2, email='test_2@gmail.com', first_name='nichole',
                        last_name = 'reyes',password = 'r123')
        model.db.session.add_all([user_1,user_2])
        model.db.session.commit()

    def tearDown(self):
        pass

    def test_index_session_route_1(self):
        """test session.json, index()"""
        result = self.client.get('/session.json')
        expected_output = b'{"email":"test@gmail.com","userData":{"email":"test@gmail.com","first_name":"adrian","last_name":"huber","user_id":1}}'
        self.assertIn(expected_output,result.data)


    def test_login_route_1(self):
        """test wrong email"""
        with app.app_context():
            mock_data = {
                'email': 'val1',
                'password': 'val2'
            }
            response = self.client.post('/login-user.json',
                                        data=json.dumps(mock_data),
                                        content_type='application/json',
                                        follow_redirects=True)
                                        
            json_response = json.loads(response.get_data(as_text=True))
            expected_response = {'status': 'wrong email'}
            self.assertEqual(response.status_code, 200)
            self.assertEqual(json_response,expected_response)
    
    def test_login_route_2(self):
        """test wrong password"""

        with app.app_context():
            mock_data = {
                'email': 'test@gmail.com',
                'password': 'val2'
            }
            response = self.client.post('/login-user.json',
                                        data=json.dumps(mock_data),
                                        content_type='application/json',
                                        follow_redirects=True)
                                        
            json_response = json.loads(response.get_data(as_text=True))
            expected_response = {'status':'wrong password'}
            self.assertEqual(response.status_code, 200)
            self.assertEqual(json_response,expected_response)
    
    def test_login_route_3(self):
        """test correct email and password"""
        with app.app_context():
            mock_data = {
                'email': 'test@gmail.com',
                'password': 'a230591h'
            }
            response = self.client.post('/login-user.json',
                                        data=json.dumps(mock_data),
                                        content_type='application/json',
                                        follow_redirects=True)
                                        
            json_response = json.loads(response.get_data(as_text=True))
            expected_response = {'status':'sign in ok', 'email':'test@gmail.com','userData':{'user_id':1,
                                                                                            'email':'test@gmail.com',
                                                                                            'first_name': 'adrian',
                                                                                            'last_name': 'huber'}}
            self.assertEqual(response.status_code, 200)
            self.assertEqual(json_response,expected_response)
        


if __name__ == "__main__":
    unittest.main()