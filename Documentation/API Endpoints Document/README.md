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

**Required Data**

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

`Authorization: Bearer <access_token>`

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

`Authorization: Bearer <access_token>`

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

`/game/normal/<level>`

- level must be an integer in 1 to 3

Randomly get the game data of a normal game by given game level. If the user has finished a game and wants to get a new one, or the user just wants to play another game, a `currect_game_id` can be passed as a parameter, so we will exclude the current game when querying in the backend. If no game is found, an error will throw instead of returning blank data.

**Accepted request types**

GET

**Optional Parameter**

`current_game_id`: a string of id

**Response**

```json
{
    "_id": "645b3a0d3db0a3e3b50a3f67",
    "level": 1,
    "puzzle": [
        [
            "J",
            "Z",
            "V",
            "S",
            "H"
        ],
        [
            "K",
            "K",
            "A",
            "N",
            "G"
        ],
        [
            "B",
            "P",
            "L",
            "M",
            "W"
        ],
        [
            "Z",
            "X",
            "U",
            "S",
            "H"
        ],
        [
            "I",
            "D",
            "E",
            "A",
            "E"
        ]
    ],
    "size": 5,
    "type": "normal",
    "words": [
        "VALUE",
        "IDEA",
        "FATHER"
    ]
}
```

### Get Today's Reward Game

`/game/todaysrewardgame`

Get today's reward game data. The algorithm in the backend is to find today's reward game which is created today. So it's possible that no game is found if we forgot to create a new one day (when deployed, we should have automation to generate a new one every day). If no game is found, an error will throw instead of returning blank data.

Current today's reward game is set to level 2 with a 7x7 puzzle.

**Accepted request types**

GET

**Response**

```json
{
    "_id": "645c3094612528742bd9ae46",
    "created_at": "2023-05-10",
    "level": 2,
    "puzzle": [
        [
            "K",
            "Z",
            "G",
            "Y",
            "Z",
            "X",
            "K"
        ],
        [
            "O",
            "P",
            "H",
            "V",
            "D",
            "P",
            "W"
        ],
        [
            "F",
            "L",
            "Q",
            "W",
            "U",
            "R",
            "H"
        ],
        [
            "T",
            "E",
            "N",
            "H",
            "F",
            "A",
            "I"
        ],
        [
            "A",
            "M",
            "O",
            "U",
            "N",
            "T",
            "T"
        ],
        [
            "A",
            "E",
            "Y",
            "U",
            "U",
            "W",
            "E"
        ],
        [
            "B",
            "G",
            "G",
            "R",
            "O",
            "X",
            "C"
        ]
    ],
    "size": 7,
    "type": "todaysrewards",
    "words": [
        "AMOUNT",
        "TEN",
        "WHITE",
        "INTERNATIONAL",
        "GUN"
    ]
}
```

### Get Game Key

`/game/key/<game_id>`

Get the answer key of a game by given `game_id`.  If no game is found, an error will throw instead of returning blank data.

**Accepted request types**

GET

**Response**

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

