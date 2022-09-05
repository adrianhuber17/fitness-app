import unittest
from backend.server.server import *
from backend.database_model import model

class Test(unittest.TestCase):

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

    def test_login_route_1(self):

        result = self.client.get('/session.json')
        expected_output = b'{"email":"test@gmail.com","userData":{"email":"test@gmail.com","first_name":"adrian","last_name":"huber","user_id":1}}'
        self.assertIn(expected_output,result.data)



if __name__ == "__main__":
    unittest.main()