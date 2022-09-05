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

    def test_create_user(self):
        """test create_user to see if database is creating new row and id for new users"""
        new_user_mock = crud.create_user("zig@gmail.com","ziggy","huber","z123")
        model.db.session.add(new_user_mock)
        model.db.session.commit()
        expected_output = User(4,"zig@gmail.com","ziggy","huber","z123")
        self.assertIn(expected_output.first_name,new_user_mock.first_name)
        self.assertIn(expected_output.last_name,new_user_mock.last_name)
        self.assertIn(expected_output.password,new_user_mock.password)
        self.assertEqual(expected_output.user_id,new_user_mock.user_id)
        
        

if __name__ == "__main__":
    unittest.main()