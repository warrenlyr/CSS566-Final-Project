# Software Design Document

CSS 566 Software Management

Spring 2023, University of Washington Bothell

Team: Purple Kitty Squad

Author: Warren Liu (Lead Developer/Architecture)

Reviewers: 

- Barack Liu (Product Owner)
- Haihan Jiang (QA Engineer)
- Shahruz Mannan (Sprint 1 Scrum Master)
- Amalaye Oyake (Sprint 2 Scrum Master)
- Arsheya Raj (Designer)

## 1 Introduction

### 1.1 Purpose

As a type of puzzle, word search games—also referred to as word find, word seek, word sleuth, or mystery word games—challenge players to locate words concealed within a grid of letters. Our main objective is to offer a captivating and enjoyable web-based word search gaming experience that appeals to a wide variety of players. By doing so, we hope to boost user engagement on the website hosting the game, as evidenced by the duration of visits and the number of return visits.

The primary objective of this project is to develop a straightforward Word Search game. Instead of emphasizing software development, the project seeks to provide an opportunity to experience the Scrum management framework. We intend to complete this project within 2 sprints in 4 weeks.

### 1.2 Scope

The scope of this document covers the design and architecture of a three-tiered client-server application that allows users to play games through a frontend user interface, which contains the game logic, a backend server managing user login/logout, user interaction, and puzzle generation, and a database for storing game data and user information. The key components included in the scope are:

- Frontend UI: A responsive web-based user interface that handles game logic and provides users with access to game selection, gameplay, score uploading, designing customized puzzles, and leaderboards.
- Backend Server: A server-side component that handles puzzle generation, user authentication, and data retrieval/storage. This component exposes a RESTful API for communication with the frontend UI.
- Database: A database system for storing and managing game data, user information, and user scores.

### 1.3 Roles and Responsibilities

Besides the roles assigned above, the parties below are further responsible for:

- Warren Liu: Website backend development and database schema configuration
- Shahruz Mannan: Game program development
- Arsheya Raj: Website frontend UI/UX development
- Haihan Jiang: QA

## 2 System Architecture

### 2.1 Overview of the Three-Tier Architecture

In this project, we will implement a three-tier client-server architecture. The first tier will be the client, where users engage in the game; the second tier will be the application server, hosting our backend functions; and the third tier will comprise the database, storing data such as user and game information. Each layer exposes an interface (API) for use by the layers above, with each layer depending solely on the facilities and services of the layer directly beneath it.

<img src=".\images\Architecture Diagram.png" height="200" />

### 2.2 Client Tire (Frontend UI)

The client tier consists of a web-based user interface that allows users to interact with the application, select and play games, create customized puzzles, manage their user accounts, and view leaderboards. This frontend UI is built using modern web technologies such as HTML, CSS, and JavaScript, along with popular frameworks and libraries (React-native) for a responsive and user-friendly experience. The client tier communicates with the server tier through RESTful API calls to fetch data and submit user actions.

Key responsibilities of the client tier include:

- Presenting the game selection and gameplay interface to users
- Processing game logic and managing game state
- Presenting puzzle customization interface to users
- Handling user input and interactions
- Managing user authentication and authorization
- Communicating with the backend server via API calls

### 2.3 Server Tier (Backend Server)

The server tier is responsible for managing user sessions, generating random puzzles, and handling API requests from the client tier. This backend server is developed using a suitable server-side programming language (Python) and web application microframework Flask. It exposes a RESTful API for the client tier to interact with, allowing for data retrieval and storage, user authentication, and game-related operations.

Key responsibilities of the server tier include:

- Authenticating and authorizing user access
- Generating random puzzles
- Handling API requests from the client tier
- Interacting with the database tier for data storage and retrieval

### 2.4 Data Tier(Database)

The data tier is responsible for storing and managing application data, such as user information, puzzle data, and user scores. It consists of a database system, the NoSQL database (MongoDB). The server tier interacts with the data tier through a data access layer, which abstracts the database operations and provides a consistent interface for data manipulation.

Key responsibilities of the data tier include:

- Storing user information, puzzle data, and user scores
- Managing data integrity and consistency
- Ensuring data security and privacy
- Providing data access and query capabilities to the server tier

## 3 Frontend UI Design

### 3.1 User Interface Components

#### 3.1.1 Landing Page

The Landing Page serves as the main entry point for users and provides access to key features of the application, such as logging in, viewing leaderboards, accessing play history, and selecting games to play.

1. **User Authentication**
   - A `Login` button is located in the top right corner.
   - Clicking the `Login` button opens a modal for users to log in or register for an account (via POST requests).
   
2. **Leaderboard (Data will be fetched via Ajax)** 
   - A large leaderboard displays the top N scores for each of the three levels.
   - A `Refresh` button to refresh the data.
   - Clicking on a level's text opens a modal with the top 100 scores for that level.

3. **Play History (Visible after user login, data will be fetched via Ajax)**
   - A list of the user's last 10 games is displayed.
   - Clicking on an item in the play history allows users to replay that game and attempt to achieve a higher score.
   - Clicking on the `Full History` opens a modal with all game histories.
   
4. **Level Selection**

   - A button for users to choose a level to play.
   - Clicking the button opens a modal with three buttons corresponding to the three levels.
   - Clicking on a level button directs users to the game page for that level.

5. **Today's Reward Game**

   - A button for users to play "Today's Reward Game" directly.

   - Clicking the button immediately directs users to the game page.
6. **Puzzle Design**
   - Clicking the button immediately directs users to the "Design Puzzle" page (will be specified in [3.1.2](#3.1.2-design-puzzle)).

#### 3.1.2 Design Puzzle

Users are able to design their own puzzle in this page. The page has a form which contains:

- **Input Text and Level Selection**
  - A text input field for users to enter comma-separated single words (e.g. cat, dog, fish. Validation for no blank exists within commas is needed here, or in the backend **TODO**).
  - A selection menu for users to choose the desired puzzle level (1-3).
- **Confirm Button and Puzzle Generation**
  - A `Confirm` button to submit the input text and level information via Ajax.
  - The backend receives the information, generates a puzzle, and sends it back to the client via Ajax.
  - The generated puzzle is displayed to the user.
- **Puzzle Modification**
  - If the user is not satisfied with the generated puzzle, they can either click the `Confirm` button again or modify the input text and level, then click the `Confirm` button again to submit their updated design.



