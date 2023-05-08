# API Endpoints Documentation

Update: 5/6/2023

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
- 404: Endpoint not found
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

