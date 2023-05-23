'''
---------------------------------------------------------------
Author: Warren Liu
---------------------------------------------------------------
Automation script to generate daily puzzle
for today's reward game.

Should be run once a day at 00:00:00.
'''

# need to add the app folder to the python path
import sys
import os
app_path = os.path.abspath(os.path.join(
    os.path.dirname(os.path.realpath(__file__)), os.pardir))
sys.path.insert(0, app_path)

from datetime import datetime
from app.models import Game


if __name__ == '__main__':
    game = Game()

    # check if today's reward game is already generated
    # to prevent duplicate generation
    if game.get_todays_reward_game():
        print('Today\'s reward game is already generated')
        print('Exiting...')
        sys.exit(0)

    # generate today's reward game
    status, error = game.create_todays_reward_game()
    print(status, error)
    print('Done')
