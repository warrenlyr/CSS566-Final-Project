'''
---------------------------------------------------------------
Author: Warren Liu
---------------------------------------------------------------
When users are designing their own game, they can choose to
either confirm their design or create a new game.

If the user chooses to confirm their design, the temp game data
will be converted to a normal game data and saved to the database.

However, if the user chooses to create a new game, the temp game
data will be left in the database. Therefore, we need to clean
the temp game data periodically.

This script should be run every day at 00:00:00 to
clean the temp game data that are older than 1 day.
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

    # clean the temp game data
    game.clean_temp_games()
    print('Done')

