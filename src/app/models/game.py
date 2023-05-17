'''
This file contains MongoDB model - Game class.
'''
# https://github.com/joshbduncan/word-search-generator
from word_search_generator import WordSearch
import json
from bson import ObjectId
from datetime import datetime

# TEST USE: to insert app into sys.path
import os
import sys
this_path = os.path.abspath(os.path.join(
    os.path.dirname(os.path.realpath(__file__)), os.pardir, os.pardir))
sys.path.insert(0, this_path)
from app import app


class Game:
    def __init__(self):
        self._collection = app.database['game']

    @staticmethod
    def puzzle_generator(words: list[str] = None, level: int = 1, size: int = 5, include_all_words: bool = True):
        '''
        Customized word search puzzle generator.
        If the puzzle is generated successfully, return the puzzle 2D array, words to find, and the key.
        Otherwise, an error will be raised.

        Usage
        ---
        - If the words are given, use the given words, level, size, and include_all_words. 
        If include_all_words is True, the puzzle will try to put all the words in the puzzle. 
        If it cannot put all the words in, it will raise an error: MissingWordsError.
        Otherwise, it will put as many words as possible in the puzzle.

        - If the words are not given, use random words, given level and size.
        Ideally, the puzzle will put level * 2 + 1 words in the puzzle.
        If the puzzle cannot put all the words in, it will put as many words as possible in the puzzle.

        Args:
            words: A list of words to be put in the puzzle, separated by comma as described in the WordSearch class.
            level: The difficulty level of the puzzle, from 1 to 3.
            size: The size of the puzzle, from 5 to 50.
            include_all_words: Whether to include all the words in the puzzle.

        Returns:
            A tuple of (puzzle, words, key) if the puzzle is generated successfully.
        '''
        try:
            # generate the puzzle

            # if the words are given, use the given words
            if words:
                # if the puzzle cannot put all the words in, it will raise an error: MissingWordsError
                game = WordSearch(
                    words=words,  # comma separated words
                    level=level,  # [1, 2, 3, 4, 8, 7]
                    size=size,  # 5-50
                    include_all_words=include_all_words,  # True/False
                )
            # else, use random words
            else:
                game = WordSearch(level=level, size=size)

                # set the count of words to find based on the level
                words_count = level * 2 + 1
                game.random_words(words_count)

            # extract the puzzle, words, and key
            puzzle = game.puzzle
            words = [w for w in game.key]
            key = [
                {
                    'word': k,
                    'start_row': game.key[k]['start'].row,
                    'start_col': game.key[k]['start'].column,
                    'direction': game.key[k]['direction'].name
                }
                for k in game.key
            ]
            
            return puzzle, words, key
        except Exception as e:
            raise e

    def create_random_game(self, level: int, type: str = 'normal'):
        '''
        Create a random game with the given level and size and store in the database
        for user to play.
        This function should be used by the admin only. And only when we initialize the database,
        or when we want to add more games to the database.

        Return True, None if the game is created successfully.
        Otherwise, return False, error message.

        Puzzle configuration
        ---
        - Puzzle Count
            - We current design the database to have 10 games for each level
        - Word Count in Puzzle (Each level has up to level * 2 + 1 words in the puzzle to find)
            - Level 1: up to 3 words
            - Level 2: up to 5 words
            - Level 3: up to 7 words
        - Puzzle Size
            - Level 1: 5x5
            - Level 2: 7x7
            - Level 3: 10x10


        Args:
            level: The difficulty level of the puzzle, in [1, 2, 3]. Although WordSearch supports [1, 2, 3, 4, 8, 7].
            size: The size of the puzzle, from 5 to 50.
            type: The type of the game, 'normal' or 'todaysrewards'.

        Returns:
            A tuple of (success, None) if the game is created successfully.
            Otherwise, a tuple of (False, error message).
        '''
        # validate the type
        if type not in ['normal', 'todaysrewards']:
            raise ValueError('Invalid type. Must be "normal" or "todaysrewards".')

        # calculate the size of the puzzle
        if level == 1:
            size = 5
        elif level == 2:
            size = 7
        elif level == 3:
            size = 10
        else:
            raise ValueError('Invalid level. Must be 1, 2, or 3.')

        try:
            # generate the puzzle
            puzzle, words, key = Game.puzzle_generator(level=level, size=size)

            # compute the name of the game
            # name for normal game: Level <level> Game <total_normal_games + 1>
            if type == 'normal':
                total_normal_games = self._collection.count_documents({'type': 'normal'})
                name = f'Level {level} Game {total_normal_games + 1}'
            # name for today's rewards game: Today's Rewards Game <date>
            else:
                name = f"Today's Rewards Game {datetime.today().strftime('%Y-%m-%d')}"

            # if generated successfully, insert the game into the database
            game = {
                'created_by': 'admin',  # 'admin' if created by admin, user_id if created by user
                'created_at': datetime.today().strftime('%Y-%m-%d'),  # datetime object
                'name': name,
                'customized': False,  # True if created by user, False if created by admin
                'type': type,  # 'normal' if normal game, 'todaysrewards' if today's rewards game
                'level': level,
                'size': size,
                'puzzle': puzzle,
                'words': words,
                'key': key
            }

            # insert the game into the database
            inserted_id = self._collection.insert_one(game).inserted_id

            if inserted_id:
                return True, None
            else:
                return False, 'Failed to insert the game into the database.'

        except Exception as e:
            return False, str(e)
        
    def create_all_random_games(self, replace=False):
        '''
        Create 10 random games for each level and store in the database for user to play.
        This function should be used by the admin only. And only when we initialize the database,
        or when we want to update normal games in the database.

        Return True, None if the games are created successfully.
        Otherwise, return False, error message.
        
        Args:
            replace: Whether to replace the existing games in the database.
                If True, replace the existing games with new ones.
                If False, only add new games to the database.
        
        Returns:
            Return True, None if the game is created successfully.
            Otherwise, return False, error message.
        '''
        # clean up the existing normal games if replace is True
        if replace:
            self._collection.delete_many({'type': 'normal'})

        game_created = 0

        # create 10 games for each level
        for level in [1, 2, 3]:
            for count in range(10):
                # to avoid creating failed games, try 10 times
                for _ in range(10):
                    status, _ = self.create_random_game(level=level, type='normal')
                    if status:
                        game_created += 1
                        break

        if game_created == 30:
            return True, None
        else:
            return False, f'Failed to create all normal games. Created {game_created} games.'
        
    def create_todays_reward_game(self):
        '''
        Create a today's reward game and store in the database for user to play.
        This function should be used by the admin only for refreshing today's reward game.

        Return True, None if the game is created successfully.
        Otherwise, return False, error message.
        '''

        status, error = self.create_random_game(level=2, type='todaysrewards')
        return status, error
    
    '''
    Below are getter functions for the game collection.
    '''
    def get_a_random_game(self, level:int, current_game_id: str):
        '''
        Get a random game from the database by the given level.
        If a current game id is given, exclude that game from the result
        to prevent the user from getting the same game again.

        Args:
            level: The difficulty level of the game, in [1, 2, 3].
            current_game_id: The id of the current game that the user is playing.
                If None, do not exclude any game.

        Returns:
            A random game from the database.
            None if no game is found.
        '''
        # validate the level
        if level not in [1, 2, 3]:
            raise ValueError('Invalid level. Must be 1, 2, or 3.')
        
        # get a random game from the database of type 'normal'
        # exclude the created_by, created_at, customized, and key fields
        if current_game_id:
            try:
                game = self._collection.find_one(
                    {'level': level, 'type': 'normal', '_id': {'$ne': ObjectId(current_game_id)}},
                    {'created_by': 0, 'customized': 0, 'created_at': 0, 'key': 0}
                )
            except:
                game = None
        else:
            game = self._collection.find_one(
                {'level': level},
                {'created_by': 0, 'customized': 0, 'created_at': 0, 'key': 0}
            )

        # convert the ObjectId to string
        if game:
            game['_id'] = str(game['_id'])

        return game
    
    def get_todays_reward_game(self):
        '''
        Get today's reward game from the database.

        Returns:
            Today's reward game.
            None if no game is found.
        '''
        # get today's reward game from the database
        # which is the only game with type 'todaysrewards'
        # and its created_at is today
        # exclude the created_by, customized, and key fields
        game = self._collection.find_one(
            {'type': 'todaysrewards', 'created_at': datetime.today().strftime('%Y-%m-%d')},
            {'created_by': 0, 'customized': 0, 'key': 0}
        )

        # convert the ObjectId to string
        if game:
            game['_id'] = str(game['_id'])

        return game
    
    def get_key_of_a_game(self, game_id: str):
        '''
        Get the key of a game by the given game id if user wants to see the answer.

        Args:
            game_id: The id of the game.

        Returns:
            list of dict: The key of the game.
            None if no game is found.
        '''

        # get the key of game from the database
        try:
            game = self._collection.find_one(
                {'_id': ObjectId(game_id)},
                {'created_by': 0, 'customized': 0, 'created_at': 0, 'puzzle': 0, 'words': 0,
                'type': 0, 'level': 0, 'size': 0}
            )
        except:
            game = None

        # convert the ObjectId to string
        if game:
            game['_id'] = str(game['_id'])

        return game
    
    def validate(self, id: str):
        '''
        Validate if a game exists in the database by the given id.

        Args:
            id: The id of the game.

        Returns:
            True if the game exists.
            False if the game does not exist.
        '''
        try:
            if self._collection.find_one({'_id': ObjectId(id)}):
                return True
            else:
                return False
        except:
            return False
        
    def get_game_level(self, id: str):
        '''
        Get the level of a game by the given id.

        Args:
            id: The id of the game.

        Returns:
            The level of the game.
            None if no game is found.
        '''
        try:
            game = self._collection.find_one({'_id': ObjectId(id)})
        except:
            game = None
        
        if game:
            return game['level']
        else:
            return None

        


if __name__ == '__main__':
    from app.models.game import Game

    # test codes
    # # size: [5, 50]
    # puzzle = WordSearch(
    #     words='dog, cat, pig',
    #     level=3,
    #     size=5,
    #     include_all_words=True,
    # )

    # print(puzzle.puzzle)
    # print(puzzle.words)
    # for w in puzzle.words:
    #     print(w.text)
    # print(puzzle.key)
    # for k in puzzle.key:
    #     print(k, puzzle.key[k]['start'].row, puzzle.key[k]['start'].column, puzzle.key[k]['direction'].name)

    # test customized puzzle generator
    # print(
    #     json.dumps(
    #         Game.puzzle_generator(
    #             level=1,
    #             size=5
    #         ), indent=4
    #     )
    # )

    # clean all the games
    game = Game()
    game._collection.delete_many({})

    # test create todays reward game
    # game = Game()
    status, error = game.create_todays_reward_game()
    print(status, error)

    # test create random game
    # game = Game()
    print(game.create_all_random_games(replace=True))

    # test get a random game
    # game = Game()
    # print(game.get_a_random_game(level=4, current_game_id=None))

    # test get today's reward game
    # game = Game()
    # print(game.get_todays_reward_game())

    # test get key of a game
    # game = Game()
    # print(game.get_key_of_a_game('645b3922f60f61e02f80e740'))

    # test validate
    # game = Game()
    # print(game.validate('645ca867e442f82fc0cbc8f4'))
