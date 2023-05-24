'''
---------------------------------------------------------------
Author: Warren Liu
---------------------------------------------------------------
Automation script to generate daily puzzle
for today's reward game.

Should be run once a day at 00:00:00.

However, the DigitalOcean server does not support cron job.
Therefore, we need to set this script to run permanently
in the background.
'''

# need to add the app folder to the python path
import sys
import os
app_path = os.path.abspath(os.path.join(
    os.path.dirname(os.path.realpath(__file__)), os.pardir))
sys.path.insert(0, app_path)

from datetime import datetime, timedelta
import time

from app.models import Game


if __name__ == '__main__':
    game = Game()

    while True:

        now = datetime.now()
        print(f'Current server time: {now}')

        if now.hour != 0:
            # if the current time does not reach 23:00, sleep for 1 hour
            if now.hour < 23:
                print('Sleeping for 1 hour...')
                time.sleep(60 * 60)
                continue
            # if the current time is 23:00, sleep for 1 minute
            else:
                print('Sleeping for 1 minute...')
                time.sleep(60)
                continue
        
        # if the current time is 00:00, generate today's reward game

        # check if today's reward game is already generated
        # to prevent duplicate generation
        if game.get_todays_reward_game():
            print('Today\'s reward game is already generated')
            print('Exiting...')
            print('Sleeping for 1 hour...')
            time.sleep(60 * 60)
            continue

        # generate today's reward game
        status, error = game.create_todays_reward_game()
        print(status, error)
        print('Done')
        print('Sleeping for 1 hour...')
        time.sleep(60 * 60)
        continue
