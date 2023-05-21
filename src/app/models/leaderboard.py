'''
This file contains MongoDB model - Leaderboard class.
'''
from datetime import datetime
import bson
from werkzeug.security import generate_password_hash, check_password_hash
import os
import sys

# TEST USE: to insert app into sys.path
this_path = os.path.abspath(os.path.join(
    os.path.dirname(os.path.realpath(__file__)), os.pardir, os.pardir))
sys.path.insert(0, this_path)
from app import app
from app.models import Game, GameHistory


class Leaderboard:
    def __init__(self):
        self._collection = app.database['leaderboard']

    def create(self, game_id: str):
        '''
        Create a leaderboard with the given game_id.

        Args:
            game_id (str): game id of the game that the leaderboard belongs to

        Returns:
            bool: True if the leaderboard is created successfully, False otherwise
        '''
        # create the leaderboard
        leaderboard = {
            'game_id': bson.ObjectId(game_id),  # game id
            'leaderboard': [],  # leaderboard
        }

        # insert the leaderboard
        try:
            self._collection.insert_one(leaderboard)
            return True
        except:
            return False

    def init(self):
        '''
        Initialize the leaderboard collection.

        This function should be called 
        1. when the server starts
        2. when a new game is created


        We currently have 2 game modes: normal game and today's reward game.
        Everyday we create a new today's reward game, and normal game has
        3 levels, each level has multiple games.

        For each game above, we have a leaderboard for it.
        The game is distinguished by the game_id.

        When initializing the leaderboard collection, we check if each
        game has a leaderboard, if not, we create one.
        '''
        # get all games
        game = Game()
        all_games = game.get_all_games()

        total_game_cnt = 0
        total_current_leaderboard_cnt = self._collection.count_documents({})
        new_leaderboard_created_cnt = 0

        for each_game in all_games:
            total_game_cnt += 1
            
            # get the game id
            game_id = str(each_game['_id'])

            # check if the game has a leaderboard
            if not self.get_leaderboard_by_game_id(game_id):
                # if the game does not have a leaderboard, create one
                self.create(game_id)
                new_leaderboard_created_cnt += 1

        print('Leaderboard collection initialized.')
        print(f'Total game count: {total_game_cnt}')
        print(f'Total current leaderboard count: {total_current_leaderboard_cnt}')
        print(f'New leaderboard created count: {new_leaderboard_created_cnt}')


    '''
    Getter functions
    '''
    def get_leaderboard_by_game_id(self, game_id: str):
        '''
        Get the leaderboard by the given game id.

        Args:
            game_id (str): game id of the game that the leaderboard belongs to

        Returns:
            leaderboard (dict): leaderboard of the given game id if the leaderboard exists, None otherwise
        '''
        # get the leaderboard from MongoDB
        leaderboard = self._collection.find_one({'game_id': bson.ObjectId(game_id)})
        return leaderboard





if __name__ == '__main__':
    lb = Leaderboard()

    # test init
    lb.init()

