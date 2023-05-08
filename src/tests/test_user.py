import unittest
# from models.user import User
from app.models.user import User
class TestUser(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.user = User()

    def test_create(self):
        # Test user creation
        success, _ = self.user.create('test_user', 'test_password')
        self.assertTrue(success)

        # Test duplicate username
        success, msg = self.user.create('test_user', 'test_password')
        self.assertFalse(success)
        self.assertEqual(msg, 'Username is already taken')

    def test_validate(self):
        # Test valid user validation
        success, _ = self.user.validate('test_user', 'test_password')
        self.assertTrue(success)

        # Test invalid username
        success, msg = self.user.validate('nonexistent_user', 'test_password')
        self.assertFalse(success)
        self.assertEqual(msg, 'Username does not exist')

        # Test invalid password
        success, msg = self.user.validate('test_user', 'wrong_password')
        self.assertFalse(success)
        self.assertEqual(msg, 'Incorrect password')

    def test_get_profile(self):
        profile = self.user.get_profile('test_user')
        self.assertIsNotNone(profile)
        self.assertEqual(profile['username'], 'test_user')
        self.assertIsNotNone(profile['registration_date'])
        self.assertIsNotNone(profile['game_played'])
        self.assertIsNotNone(profile['reward_points'])

    def test_remove_user(self):
        # Test user removal
        success, _ = self.user.remove_user('test_user')
        self.assertTrue(success)

        # Test non-existent user removal
        success, msg = self.user.remove_user('test_user')
        self.assertFalse(success)
        self.assertEqual(msg, 'Failed to remove user')


if __name__ == '__main__':
    unittest.main()
