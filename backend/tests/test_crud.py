import unittest
from backend.server.server import *
from backend.database_model import model
from backend.helper_files import crud

class User:
    """User data mock"""

    def __init__(self,user_id,email,first_name,last_name,passwords):
        self.user_id = user_id
        self.email = email
        self.first_name = first_name
        self.last_name = last_name
        self.password = passwords
    
    def __repr__(self):
        return f"<User user_id: {self.user_id} user_email: {self.email}>"

class Test(unittest.TestCase):

    def setUp(self):
        app.config['TESTING'] = True
        self.client = app.test_client()

        # Connect to test database
        model.connect_to_db(app)
        model.db.drop_all()
        # Create tables and add sample data
        model.db.create_all()
        self.example_data()

    def example_data(self):
        """Create sample data."""

        # Add sample users
        user_1 = model.User(email='test@gmail.com', first_name='adrian',
                        last_name = 'huber',password = 'a230591h')
        user_2 = model.User(email='test_2@gmail.com', first_name='nichole',
                        last_name = 'reyes',password = 'r123')
        user_3 = model.User(email='test_3@gmail.com', first_name='ganch',
                        last_name = 'rocoso',password = 'gg123')
        model.db.session.add_all([user_1,user_2,user_3])
        model.db.session.commit()

    def tearDown(self):
        pass
        
    def test_get_all_users(self):
        test_mock = crud.get_all_users_list()
        expected_output = [{'fullName':'adrian huber','userId':1},
                            {'fullName':'nichole reyes','userId':2},
                            {'fullName':'ganch rocoso','userId':3},
                            ]
        self.assertEqual(test_mock,expected_output)
   

if __name__ == "__main__":
    unittest.main()