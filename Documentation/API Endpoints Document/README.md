# API Endpoints Documentation

Update: 5/22/2023

Current API version: v0

API endpoints prefix: `/api/<api_version>`

**Table of Contents**
- [Status Code](#status-code)
- [Public/Common](#publiccommon)
  - [Get API status](#get-api-status)
- [Authorization](#authorization)
  - [Login](#login)
  - [Register](#register)
  - [Logout](#logout)
- [User Account](#user-account)
  - [Profile (Login Required)](#profile-login-required)
  - [User Game History](#user-game-history)
  - [Delete Account (Login Required)](#delete-account-login-required)
- [Game](#game)
  - [Get a Normal Game](#get-a-normal-game)
  - [Get Today's Reward Game](#get-todays-reward-game)
  - [Get Game Key](#get-game-key)
  - [Finish a Game](#finish-a-game)
  - [Design a Puzzle](#design-a-puzzle)
  - [Confirm a Designed Puzzle](#confirm-a-designed-puzzle)
- [Leaderboards](#leaderboards)
  - [Share Score](#share-score)
  - [Get Leaderboard](#get-leaderboard)


## Status Code

For more detailed information, see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

Some common statuses used in this project are as follows:

- 200: The request succeeded
- 201: A new resource was created
- 400: Bad request
- 401: Unauthorized
- 404: Not found
- 422: Unprocessable content (usually the request is incomplete or does not match requirements)

## Public/Common

### Get API status

`/status`

This function is used to check connection with backend server.

**Accepted request types**

GET

**Response**

```json
{
    "status": "OK"
}
```

## Authorization

`/auth`

### Login

`/auth/login`

Use `username` and `password` to gain an access token that will be refreshed automatically when it is about to expire. See **Token Refresh** section below for more details.

**Accepted request types**

POST

**Required Body**

```json
{
	"username": "your_user_name",
	"password": "your_password"
}
```

**Response**

Success (200)

```json
{
    "access_token": "an_access_token"
}
```

Failed

```json
{
    "error": "Incorrect password"
}
```



**Token Refresh**

The token refresh feature is available only for authenticated (logged-in) users. While interacting with the application, users won't require authentication for every function, but some specific functions will necessitate it.

Under typical circumstances, the response to an authenticated request would look something like:

```json
{
	"data": "relevant_data"
}
```

where "relevant_data" is the information requested from the API.

However, when the user's authentication token is close to expiration, the system automatically refreshes it. This refreshed token is then included in the response. Therefore, it's crucial to check every response for an `access_token` field, which, if present, would indicate that the token has been refreshed:

```json
{
	"data": "relevant_data",
	"access_token": "refreshed_access_token"
}
```

### Register

`/auth/register`

Register a user in the database by giving `username` and `password`. If the username is already taken or failed to create the user in database, an error will be thrown with status code 400 along with an error message. Otherwise, status code 200 and a message will be thrown.

 **Accepted request types**

POST

**Response**

Success (200)

```json
{
    "message": "User registered successfully"
}
```

Failed

```json
{
    "error": "error message"
}
```

### Logout

`/auth/logout`

Logout user from the system (the frontend should also remove the token in client).

**Accepted request types**

POST

**Response**

```json
{
	"message": "Logout successful"
}
```

## User Account

### Profile (Login Required)

`/auth/user/profile`

 Get a user profile.

**Accepted request types**

GET

**Required Header**

- `Authorization: Bearer <access_token>`

**Response**

Success (200)

- `game_played`: the total game played
- `registration_data`: the date this account is registered
- `reward_points`: total reward points earned
- `todays_reward_game_played`: if the user has played today's reward game, will be refreshed every day
- `username`: username

```json
{
    "game_played": 2,
    "registration_date": "2023-05-17T15:32:52.488000",
    "reward_points": 0,
    "todays_reward_game_played": true,
    "username": "test"
}
```

### User Game History

`/auth/user/gamehistory`

Get game history of a user.

**Accepted request types**

GET

**Required Header**

- `Authorization: Bearer <access_token>`

**Response**

Success (200)

- `game_id`: ID of the game
- `game_history_id`: ID of the game history
- `game_name`: name of the game
- `start_time`: time the game is requested
- `end_time`: time the game is requested to finish (may be null if the user has not finished the game or left before finishing)
- `finished`: if the game is finished
- `valid_time_elapsed`: if the game is finished, a time_elapsed variable will be sent from the frontend to the backend. The backend server will use the system recorded time_elapsed (the difference between `start_time` and `end_time`) to validate if the time_elapsed from the frontend is valid. If not, we assume the user hacked or cheated on the game, this attribute will be set to true, and score will be marked as 0
- `attempts`: if the game is finished, the number of attempts the user used
- `score`: if the game is finished, and the time_elapsed is valid, a score will be calculated

```json
[
    {
        "attempts": 0,
        "end_time": null,
        "finished": false,
        "game_history_id": "646c3adbced4fc0addccf70e",
        "game_id": "646be65172bc5379c568bd61",
        "game_name": "Level 3 Game 1",
        "score": 0,
        "start_time": "2023-05-22 21:02:35",
        "valid_time_elapsed": false
    },
    {
        "attempts": 0,
        "end_time": null,
        "finished": false,
        "game_history_id": "646c3ae1ced4fc0addccf70f",
        "game_id": "646be65172bc5379c568bd57",
        "game_name": "Level 2 Game 1",
        "score": 0,
        "start_time": "2023-05-22 21:02:41",
        "valid_time_elapsed": false
    },
    {
        "attempts": 0,
        "end_time": null,
        "finished": false,
        "game_history_id": "646c3ae7ced4fc0addccf710",
        "game_id": "646be65172bc5379c568bd57",
        "game_name": "Level 2 Game 1",
        "score": 0,
        "start_time": "2023-05-22 21:02:47",
        "valid_time_elapsed": false
    }
]
```

### Delete Account (Login Required)

`/auth/deleteaccount`

Delete a user from the database. If successful, status code 200 and a message will be returned, status code 400 with an error message otherwise.

**Accepted request types**

DELETE

**Required Header**

- `Authorization: Bearer <access_token>`

**Response**

Success (200)

```json
{
    "message": "User deleted successfully"
}
```

Failed

```json
{
    "error": "Failed to remove user"
}
```

## Game

`/game`

### Get a Normal Game

`/game/normalpuzzle/<level>`

- `level` must be an integer in 1 to 3

Randomly get the game data of a normal game by given game level. If the user has finished a game and wants to get a new one, or the user just wants to play another game, a `currect_game_id` can be passed as a parameter, so we will exclude the current game when querying in the backend. If no game is found, an error will throw instead of returning blank data.

When a game is fetched from the backend, a game history entry is generated for that game. If the user is logged in and an access token is supplied, the game history will be associated with the user, and the `game_plyed` attribute of the user will be increased by 1. Otherwise, the game history remains unlinked to any user and serves solely for score calculation purposes. For further information on game history, refer to the [Finish a Game](#finish-a-game) section.

**Accepted request types**

GET

**Optional Parameter**

- `current_game_id`: a string of id

**Optional Header**

- `Authorization: Bearer <access_token>`

**Response**

Success

- `game_data`
  - `_id`: game data ID in the database
  - `level`: difficulty level
  - `name`: Game name
  - `puzzle`: 2D array of characters representing the puzzle
  - `size`: the size of the puzzle
  - `type`: "normal" if it's a normal game, "todaysrewards" if it's today's reward game
  - `words`: words need to be found in the puzzle
- `game_history_id`: the game history ID in the database, needed to finish game

```json
{
    "game_data": {
        "_id": "645ca865e442f82fc0cbc8d5",
        "level": 1,
        "name": "Level 3 Game 21",
        "puzzle": [
            [
                "Y",
                "R",
                "Z",
                "W",
                "H"
            ],
            [
                "I",
                "Z",
                "H",
                "R",
                "K"
            ],
            [
                "Z",
                "U",
                "I",
                "I",
                "W"
            ],
            [
                "S",
                "P",
                "M",
                "T",
                "X"
            ],
            [
                "Z",
                "P",
                "S",
                "E",
                "T"
            ]
        ],
        "size": 5,
        "type": "normal",
        "words": [
            "SET",
            "WRITE"
        ]
    },
    "game_history_id": "6462ad6af595d88ebe9c300e"
}
```

Failed

```json
{
    "error": "error message"
}
```

### Get Today's Reward Game

`/game/dailypuzzle`

Get today's reward game data. The algorithm in the backend is to find today's reward game which is created today. So it's possible that no game is found if we forgot to create a new one day (when deployed, we should have automation to generate a new one every day). If no game is found, an error will throw instead of returning blank data.

Current today's reward game is set to level 2 with a 7x7 puzzle.

We will first check if the user has played today's reward game if an access token is supplied. If the `todays_reward_game_played` attribute of the user is `True`, no game will be returned and an error message will be thrown.

When a game is fetched from the backend, a game history entry is generated for that game. If the user is logged in and an access token is supplied, the game history will be associated with the user, and the `game_plyed` attribute of the user will be increased by 1 and the `todays_reward_game_played` attribute of the user will be set to `True`. Otherwise, the game history remains unlinked to any user and serves solely for score calculation purposes. For further information on game history, refer to the [Finish a Game](#finish-a-game) section.

**Accepted request types**

GET

**Optional Header**

- `Authorization: Bearer <access_token>`

**Response**

Success (200)

- `game_data`
  - `_id`: game data ID in the database
  - `created_at`: the date created this game, today's reward game only looks for the daily puzzle created at the same date
  - `level`: difficulty level
  - `name`: Game name
  - `puzzle`: 2D array of characters representing the puzzle
  - `size`: the size of the puzzle
  - `type`: "normal" if it's a normal game, "todaysrewards" if it's today's reward game
  - `words`: words need to be found in the puzzle
- `game_history_id`: the game history ID in the database, needed to finish game

```json
{
    "game_data": {
        "_id": "6461e257bdbc156d701cfe30",
        "created_at": "2023-05-15",
        "name": "Today's Rewards Game 2023-05-17",
        "level": 2,
        "puzzle": [
            [
                "F",
                "E",
                "D",
                "E",
                "R",
                "A",
                "L"
            ],
            [
                "P",
                "U",
                "R",
                "P",
                "O",
                "S",
                "E"
            ],
            [
                "R",
                "E",
                "A",
                "S",
                "O",
                "N",
                "D"
            ],
            [
                "D",
                "E",
                "X",
                "P",
                "E",
                "R",
                "T"
            ],
            [
                "P",
                "B",
                "A",
                "S",
                "E",
                "T",
                "G"
            ],
            [
                "T",
                "X",
                "H",
                "M",
                "B",
                "M",
                "C"
            ],
            [
                "C",
                "T",
                "R",
                "X",
                "A",
                "G",
                "N"
            ]
        ],
        "size": 7,
        "type": "todaysrewards",
        "words": [
            "EXPERT",
            "PURPOSE",
            "FEDERAL",
            "BASE",
            "REASON"
        ]
    },
    "game_history_id": "6462ac50f595d88ebe9c300d"
}
```

Failed (User has already played today's reward game - Code 423 LOCKED)

```json
{
    "error": "You have played today's reward game"
}
```

Failed (Other cases)

```json
{
    "error": "error message"
}
```

### Get Game Key

`/game/key/<game_id>`

Get the answer key of a game by given `game_id`.  If no game is found, an error will throw instead of returning blank data.

**Accepted request types**

GET

**Response**

Success (200)

- `_id`: the game id in the database, used to validate if the key is for the correct game the frontend if requested for
- `key`: the answer for the game
  - `direction`: N going up, S going down, W going left, E going right
  - `start_col`: column index of the start point
  - `start_row`: row index of the start point
  - `word`: the word start at this index

```json
{
    "_id": "645b3922f60f61e02f80e740",
    "key": [
        {
            "direction": "E",
            "start_col": 0,
            "start_row": 4,
            "word": "MONTH"
        },
        {
            "direction": "E",
            "start_col": 1,
            "start_row": 2,
            "word": "VOICE"
        },
        {
            "direction": "S",
            "start_col": 6,
            "start_row": 0,
            "word": "STRONG"
        },
        {
            "direction": "E",
            "start_col": 1,
            "start_row": 1,
            "word": "SAVE"
        },
        {
            "direction": "E",
            "start_col": 3,
            "start_row": 6,
            "word": "SAY"
        }
    ]
}
```

Failed

```json
{
    "error": "error message"
}
```

### Finish a Game

`/game/finish/<game_history_id>`

Complete a game session identified by the provided `game_history_id`.

Upon retrieving a game, a game history record is generated, which includes the `game_id`, `user_id` (optional), and `start_time` details. To finalize the game session, submit a request with the `game_history_id` in the URL, and include `time_elapsed` and `attempts` in the request body.

Upon receiving the request, the system logs the current time as the `end_time`. It then compares the actual time elapsed between the `start_time` and `end_time` with the submitted `time_elapsed` value. The system allows for a 10-second tolerance in this comparison. If the difference between the actual and submitted elapsed times is less than 10 seconds, the system proceeds to calculate the score using the provided `time_elapsed` and `attempts`. However, if the difference exceeds 10 seconds, the system assumes cheating has occurred and assigns a score of 0.

**Accepted request types**

POST

**Required Body**

- `time_elapsed`: time elapsed in ms (integer)
- `attempts`: number of attempts (integer)

**Response**

Success (200)

```json
// There are two types of success

// 1. Finished without any issue
{
    "score": 2595.0,
    "status": true
}

// 2. Finished successfully, but cheating is detected
{
    "error": "Invalid time elapsed (cheating) detected",
    "score": 0,
    "status": true
}
```

Failed

```json
{
    "error": "error message if bad request"
}
```

### Design a Puzzle

`/game/designpuzzle/create`

Generate a customized puzzle by providing the `words` and `level` in the request body. This custom puzzle will be structured identically to the normal and daily reward games. Upon successful creation, a `game_id` will be returned along with the game data, enabling users to review the design and decide whether to proceed with it or generate a new one.

If an access token is included in the request, the `created_by` attribute will be assigned the user ID. If no access token is provided, `created_by` will be set as "anonymous".

Games created via this API endpoint will be labeled as `type="temp"`. It's the server's responsibility to purge "temp" game data that's over 2 hours old. Once users are content with their designed puzzle, they can finalize it by hitting the confirm button and sending another request to the **Confirm a Designed Puzzle** API endpoint. This action will transition the game data from "temp" to "normal" status. For further information, refer to the **Confirm a Designed Puzzle** API endpoint section.

**Accepted request types**

POST

**Optional Header**

- `Authorization: Bearer <access_token>`

**Required Body**

- `words`: A string of space-separated words (not a list of string), eg: "cat dog pig"
- `level`: An integer between 1-3

**Response**

Success (201)

```json
{
    "game": {
        "_id": "646be677afc35a4470632e6f",
        "created_at": "2023-05-22",
        "created_by": "646556146471c08c55b3f2bf",
        "customized": true,
        "key": [
            {
                "direction": "S",
                "start_col": 3,
                "start_row": 1,
                "word": "CAT"
            },
            {
                "direction": "E",
                "start_col": 0,
                "start_row": 1,
                "word": "DOG"
            },
            {
                "direction": "E",
                "start_col": 0,
                "start_row": 0,
                "word": "PIG"
            }
        ],
        "level": 1,
        "name": "Temp Design Game - User - 646556146471c08c55b3f2bf - 20230522150231083870",
        "puzzle": [
            [
                "P",
                "I",
                "G",
                "Z",
                "A"
            ],
            [
                "D",
                "O",
                "G",
                "C",
                "O"
            ],
            [
                "K",
                "X",
                "P",
                "A",
                "B"
            ],
            [
                "J",
                "G",
                "R",
                "T",
                "J"
            ],
            [
                "X",
                "P",
                "Q",
                "B",
                "S"
            ]
        ],
        "size": 5,
        "type": "temp",
        "words": [
            "CAT",
            "DOG",
            "PIG"
        ]
    },
    "game_id": "646be677afc35a4470632e6f"
}
```

Failed

```json
{
    "error": "error message"
}
```

### Confirm a Designed Puzzle

`/game/designpuzzle/submit`

Create a normal game from a "temp" game by given `game_id`. When users find the puzzle design to their liking, they can proceed to finalize it by hitting the confirm button. This action sends a request to our server where we process it accordingly, transforming the temporary game into a normal game.

**Accepted request types**

POST

**Required Body**

- `game_id`: The ID of temp game to be confirmed

**Response**

Success (201)

```json
{
    "status": true
}
```

Failed

```json
{
    "error": "error message"
}
```

## Leaderboards

`/leaderboard`

### Share Score

`/leaderboard/sharescore/<game_history_id>`

Submit the score to the leaderboard of a specific game using `game_history_id`. There's no need to provide the game ID as it can be directly fetched from the `game_history` object. 

Please note, scores can only be shared from completed games. If a game isn't finished, an error message will be generated. Leaderboard of each game will only host the top 10 scores. If the leaderboard is full and the score submitted is lower than the lowest score in the leaderboard, an error will be thrown as well.

**Accepted request types**

POST

**Required Body**

- `share_anonymously`: bool value, indicating whether the user wants to share the score anonymously or not

**Response**

Success (201)

```json
{
    "status": true
}
```

Failed

```json
{
    "error": "Error message"
}
```

### Get Leaderboard

`/leaderboard/get/<game_id>`

Get the data of a leaderboard of a game by given `game_id`. The `game_id` is passed in the url.

**Accepted request types**

GET

**Response**

Success (200)

```json
{
    "game_id": "646be65072bc5379c568bd4d",
    "game_name": "Level 1 Game 1",
    "last_updated": "2023-05-22 22:10:56",
    "leaderboard": [
        {
            "rank": 1,
            "score": 1995.0,
            "username": "test"
        },
        {
            "rank": 2,
            "score": 1935.0,
            "username": "Anonymous"
        }
    ]
}
```

Failed

```json
{
    "error": "Error message"
}
```

