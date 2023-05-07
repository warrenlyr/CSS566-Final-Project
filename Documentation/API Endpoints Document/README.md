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
  - [Logout](#logout)
- [User Account](#user-account)
  - [Profile](#profile)
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

```json
{
    "access_token": "an_access_token"
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

### Logout

`/auth/logout`

Logout user from the system (the frontend should also remove the token in client).

**Accepted request types**

POST

**Response**

```json
{
	'message': 'Logout successful'
}
```

## User Account

### Profile

`/auth/profile`

Get user profile.

**Accepted request types**

GET

**Required Header**

`Authorization: Bearer <access_token>`

**Response**

```json
{
    "account_created": "2023/05/06",
    "games_played": 100,
    "username": "test"
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

