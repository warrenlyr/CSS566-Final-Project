'''
This file contains MongoDB model - User class.
'''
from datetime import datetime
import bson
from werkzeug.security import generate_password_hash, check_password_hash

# TEST USE: to insert app into sys.path
import os
import sys
this_path = os.path.abspath(os.path.join(
    os.path.dirname(os.path.realpath(__file__)), os.pardir, os.pardir))
sys.path.insert(0, this_path)

from app import app



class User:
    def __init__(self):
        self._collection = app.database['user']

    def create(self, username: str, password: str):
        '''
        Create a user with the given username and password. (Register a user)

        Args:
            username (str): username of the user to create
            password (str): password of the user to create

        Returns:
            bool: True if the user is created successfully, False otherwise
            msg (str): error message if the user is not created successfully
        '''
        # check if the username is already taken
        if self._collection.find_one({'username': username}):
            return False, 'Username is already taken'
        
        # create the user in MongoDB
        user = {
            'username': username,
            'password': generate_password_hash(password),
            'registration_date': datetime.now(),
            'game_played': 0,
            'reward_points': 0
        }
        
        # insert the user into MongoDB and get the inserted id
        inserted_id = self._collection.insert_one(user).inserted_id

        # if the user is created successfully
        if inserted_id:
            return True, None
        else:
            return False, 'Failed to create user'
        
    def validate(self, username: str, password: str):
        '''
        Validate the given username and password when a user tries to login.

        Args:
            username (str): username of the user to validate
            password (str): password of the user to validate

        Returns:
            bool: True if the user is validated successfully, False otherwise
            msg (str): error message if the user is not validated successfully
        '''
        # check if the username exists in MongoDB
        this_user = self._collection.find_one({'username': username})
        if not this_user:
            return False, 'Username does not exist'
        
        # check if the password is correct
        if not check_password_hash(this_user['password'], password):
            return False, 'Incorrect password'
        
        # if the user is validated successfully
        return True, None
    
    def get_profile(self, username: str):
        '''
        Get a user data from the datase with the given username.
        Generally for the frontend to get the user data.

        Username should be validated before calling this method. So we do not need to validate
        the username in this method.

        Args:
            username (str): username of the user to get
        
        Returns:
            dict: user data
        '''
        # get the user from MongoDB
        # only return the username, registration_date, game_played, and reward_points
        data = self._collection.find_one({'username': username}, {'_id': 0, 'password': 0})
        # Covert the MongoDB Date to datetime
        data['registration_date'] = data['registration_date'].isoformat()

        # get game history
        #TODO

        return data
    
    def get_id(self, username: str):
        '''
        Get the id of a user from the database with the given username.
        Generally for the frontend to get the user data.

        Username should be validated before calling this method. So we do not need to validate
        the username in this method.

        Args:
            username (str): username of the user to get
        
        Returns:
            bson.ObjectId: id of the user
        '''
        # get the user from MongoDB
        data = self._collection.find_one({'username': username})
        return data['_id']
    
    def remove_user(self, username: str):
        '''
        Remove a user from the database with the given username.
        Generally for the frontend to delete account.

        Username should be validated before calling this method. So we do not need to validate
        the username in this method.

        Args:
            username (str): username of the user to remove

        Returns:
            bool: True if the user is removed successfully, False otherwise
            msg (str): error message if the user is not removed successfully
        '''
        # remove the user from MongoDB
        result = self._collection.delete_one({'username': username})
        # if the user is removed successfully
        if result.deleted_count == 1:
            return True, None
        else:
            return False, 'Failed to remove user'
        
    def increase_game_played(self, username: str):
        '''
        Increase the game_played attribute of a user by 1.

        Username should be validated before calling this method. So we do not need to validate
        the username in this method.

        Args:
            username (str): username of the user to increase game_played

        Returns:
            bool: True if the user is updated successfully, False otherwise
        '''
        # increase the game_played attribute by 1
        result = self._collection.update_one({'username': username}, {'$inc': {'game_played': 1}})
        # if the user is updated successfully
        if result.modified_count == 1:
            return True
        else:
            return False
        
    def increase_reward_points(self, username: str, reward_points: float):
        '''
        Increase the reward_points attribute of a user by the given reward_points.

        Username should be validated before calling this method. So we do not need to validate
        the username in this method.

        Args:
            username (str): username of the user to increase reward_points
            reward_points (float): reward_points to increase

        Returns:
            bool: True if the user is updated successfully, False otherwise
        '''
        # increase the reward_points attribute by the given reward_points
        result = self._collection.update_one({'username': username}, {'$inc': {'reward_points': reward_points}})
        # if the user is updated successfully
        if result.modified_count == 1:
            return True
        else:
            return False
        


if __name__ == '__main__':
    # test the User class
    user = User()
    # print(user.create('test', 'test'))
    print(user.validate('test', 'test'))
