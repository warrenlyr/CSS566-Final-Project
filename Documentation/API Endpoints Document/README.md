# API Endpoints Documentation

Update: 5/10/2023

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
  - [Delete Account (Login Required)](#delete-account-login-required)
- [Game](#game)
  - [Get a Normal Game](#get-a-normal-game)
  - [Get Today's Reward Game](#get-todays-reward-game)
  - [Get Game Key](#get-game-key)
- [Leaderboards](#leaderboards)
  - [Today's Reward Game](#todays-reward-game)
  - [Normal Game](#normal-game)


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

Failed (401)

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

Failed (400)

```json
{
    "error": "Username is already taken"
}
```

Failed (422)

```json
{
    "error": "Failed to create user"
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

`/auth/profile`

 Get a user profile.

**Accepted request types**

GET

**Required Header**

- `Authorization: Bearer <access_token>`

**Response**

```json
{
    "game_played": 0,
    "registration_date": "2023-05-07T16:29:32.971000",
    "reward_points": 0,
    "username": "test"
}
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

Failed (422)

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

When a game is fetched from the backend, a game history entry is generated for that game. If the user is logged in and an access token is supplied, the game history will be associated with the user. Otherwise, the game history remains unlinked to any user and serves solely for score calculation purposes. For further information on game history, refer to the [Finish a Game](#finish-a-game) section.

**Accepted request types**

GET

**Optional Parameter**

- `current_game_id`: a string of id

**Optional Header**

- `Authorization: Bearer <access_token>`

**Response**

- `game_data`
  - `_id`: game data ID in the database
  - `level`: difficulty level
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

### Get Today's Reward Game

`/game/dailypuzzle`

Get today's reward game data. The algorithm in the backend is to find today's reward game which is created today. So it's possible that no game is found if we forgot to create a new one day (when deployed, we should have automation to generate a new one every day). If no game is found, an error will throw instead of returning blank data.

Current today's reward game is set to level 2 with a 7x7 puzzle.

When a game is fetched from the backend, a game history entry is generated for that game. If the user is logged in and an access token is supplied, the game history will be associated with the user. Otherwise, the game history remains unlinked to any user and serves solely for score calculation purposes. For further information on game history, refer to the [Finish a Game](#finish-a-game) section.

**Accepted request types**

GET

**Optional Header**

- `Authorization: Bearer <access_token>`

**Response**

- `game_data`
  - `_id`: game data ID in the database
  - `created_at`: the date created this game, today's reward game only looks for the daily puzzle created at the same date
  - `level`: difficulty level
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

### Get Game Key

`/game/key/<game_id>`

Get the answer key of a game by given `game_id`.  If no game is found, an error will throw instead of returning blank data.

**Accepted request types**

GET

**Response**

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

### Finish a Game

`/game/finish/<game_history_id>`

Complete a game session identified by the provided `game_history_id`.

Upon retrieving a game, a game history record is generated, which includes the `game_id`, `user_id` (optional), and `start_time` details. To finalize the game session, submit a request with the `game_history_id` in the URL, and include `time_elapsed` and `attempts` in the request body.

Upon receiving the request, the system logs the current time as the `end_time`. It then compares the actual time elapsed between the `start_time` and `end_time` with the submitted `time_elapsed` value. The system allows for a 10-second tolerance in this comparison. If the difference between the actual and submitted elapsed times is less than 10 seconds, the system proceeds to calculate the score using the provided `time_elapsed` and `attempts`. However, if the difference exceeds 10 seconds, the system assumes cheating has occurred and assigns a score of 0.

**Accepted request types**

POST

**Required Body**

- `time_elapsed`: time elapsed in ms (integer)
- `attemps`: number of attempts (integer)

**Response**

Failed (400)

```json
{
    "error": "error message if bad request"
}
```

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

## Leaderboards

`/leaderboards`

### Today's Reward Game

`/leaderboards/todaysrewardgame`

Get leaderboard data of today's reward game.

**Accepted request types**

GET

**Response**

```json
{
    "data": [
        {
            "rank": 0,
            "score": 100,
            "username": "Anonymous"
        },
        {
            "rank": 1,
            "score": 99,
            "username": "test-todaysrewardgame-rank-1"
        },
        ...
    ]
}
```

### Normal Game

`/game/level/<level>`

e.g. `/game/level/1`

Get leaderboard data of normal games based on the game level, levels are range from 1-3.

**Accepted request types**

GET

**Response**

```json
{
    "data": [
        {
            "rank": 0,
            "score": 100,
            "username": "Anonymous"
        },
        {
            "rank": 1,
            "score": 99,
            "username": "test-todaysrewardgame-rank-1"
        },
        ...
    ]
}
```

