# Software Design Document

CSS 566 Software Management

Spring 2023, University of Washington Bothell

Team: Purple Kitty Squad

Author: Warren Liu

Roles:

- Barack Liu (Product Owner)
- Warren Liu (Lead Developer/Architecture/Backend Developer)
- Haihan Jiang (QA Engineer)
- Shahruz Mannan (Sprint 1 Scrum Master/Frontend Developer)
- Amalaye Oyake (Sprint 2 Scrum Master/QA Engineer)
- Arsheya Raj (Designer/Frontend Developer)

## 1 Overview

As a type of puzzle, word search games—also referred to as word find, word seek, word sleuth, or mystery word games—challenge players to locate words concealed within a grid of letters. Our main objective is to offer a captivating and enjoyable web-based word search gaming experience that appeals to a wide variety of players. By doing so, we hope to boost user engagement on the website hosting the game, as evidenced by the duration of visits and the number of return visits.

## 2 System Architecture & Design Patterns

In this project, we will implement a three-tier client-server architecture. The first tier will be the client, which will be developed using React and JavaScript; the second tier will be the application server, which will be developed using Python, with the microframework Flask; and the third tier will comprise the database, which is MongoDB. Each layer exposes an interface (API) for use by the layers above, with each layer depending solely on the facilities and services of the layer directly beneath it.

Due to time constraints and the labor we can use at the moment, we will sacrifice the security of the game so that the game algorithm will be completely developed in JavaScript in the frontend instead of processing the game stage and data in the backend. The game will use a Model-View-Controller (MVC) design pattern to separate the game logic from the presentation and user interaction.

### 2.1 Three-Tier Architecture

<img src=".\images\Architecture Diagram.png" height="450" />

#### Client Tier

The client tier consists of a web-based user interface that allows users to interact with the application, select and play games, create customized puzzles, manage their user accounts, and view leaderboards. This frontend UI is built using modern web technologies such as HTML, CSS, and JavaScript, along with popular frameworks and libraries (React-Node.JS) for a responsive and user-friendly experience. The client tier communicates with the server tier through RESTful API calls to fetch data and submit user actions.

Key responsibilities of the client tier include:

- Presenting the game selection and gameplay interface to users
- Processing game logic and managing game state
- Presenting puzzle customization interface to users
- Handling user input and interactions
- Managing user authentication and authorization
- Communicating with the backend server via API calls

#### Server Tier

The server tier is responsible for managing user sessions, generating random puzzles, and handling API requests from the client tier. This backend server is developed using a suitable server-side programming language (Python) and web application microframework Flask. It exposes a RESTful API for the client tier to interact with, allowing for data retrieval and storage, user authentication, and game-related operations.

Key responsibilities of the server tier include:

- Authenticating and authorizing user access
- Generating random puzzles
- Handling API requests from the client tier
- Interacting with the database tier for data storage and retrieval

#### Database Tier

The data tier is responsible for storing and managing application data, such as user information, puzzle data, and user scores. It consists of a database system, the NoSQL database (MongoDB). The server tier interacts with the data tier through a data access layer, which abstracts the database operations and provides a consistent interface for data manipulation.

Key responsibilities of the data tier include:

- Storing user information, puzzle data, and user scores
- Managing data integrity and consistency
- Ensuring data security and privacy
- Providing data access and query capabilities to the server tier

### 2.2 UML Diagram

<img src=".\images\UML Diagram.jpg" height="450" />

### 2.3 Packages Diagram

<img src=".\images\Packages Diagram.jpg"/>

### 2.4 Classes Diagram

<img src=".\images\Classes Diagram.jpg"/>

### 2.5 Integration with other systems

The key advantage of implementing this game in a web-based format is that Roaming Kitty is a website. To embed our game into their website, we only need to add these pages to their existing pages, and deploy the required backend server and database separately without affecting their existing services at all.

### 2.6 Scalability and performance considerations

As we are using OOP in this project, and the frontend and the backend communicate via API, we can easily handle an increasing number of users or higher loads by dividing the existing backend server into multiple microservices and adding an API gateway between the frontend and backend. If the database cannot handle the increasing traffic, we can horizontally scale the database so that each instance deals with a specific type of data (such as game, game history, and user).

### 2.7 Security considerations

Our game is designed to be played both with and without login. We do not collect user information such as email addresses, but only require a username and password. To protect user information, we will encrypt passwords in the database, ensuring that the username and password pairs remain safe even if our data is leaked. Regarding game security, we must prevent users from cheating or hacking our game. Ideally, we would process all game stages and data in the backend to control operations on the timer, attempts used, and score calculation. However, due to time constraints and labor limitations, all game logic will be sent to the client-side, making it possible for users to modify game stages and data. In response, our backend will attempt to prevent cheating by recording the time the game data is requested and the time the game is finished, allowing us to validate the elapsed time at least. If we had more time, we would implement the entire game logic in the backend instead of on the client side.

## 3 Technologies and Frameworks Chosen

### 3.1 Client Side

#### React.js

The frontend is built using standard modern web development methodologies: It's written in JavaScript ES6 that is compiled to browser compatible JavaScript using Babel. User interface components are built using React.js. React.js was chosen as the frontend framework, React code is easier to maintain and is flexible due to its modular structure compared to other frameworks such as Angular.js or jQuery. One of the main benefits of using React is its potential to reuse components. This flexibility saves a huge amount of time and costs to businesses. Another reason why React was chosen because of its strong community support. A large number of individual React developers are contributing towards making React a better frontend framework and free tutorials can be found easily on the internet. Since there are just two sprints to develop the product and not all team members have worked with React before, this framework was an appropriate choice to be used for developing this product.

#### SCSS

For the styling language, SCSS was chosen for several reasons. First and foremost, SCSS provides enhanced productivity and maintainability compared to plain CSS. With features such as variables, mixins, functions, and nesting, it is possible to create more modular and reusable stylesheets. Variables enable defining and reusing values throughout the project’s styles, making it easier to update styles globally. Mixins and functions enable code reuse and abstraction, reducing duplication and improving the organization of styles. Additionally, nesting in SCSS allows to nest selectors, making our styles more readable and reducing the need for repeated class names.

### 3.2 Server Side

#### Python

Python has garnered immense popularity as a programming language due to its robustness and versatility. Its easy-to-read syntax, which promotes clean and understandable code, makes it an excellent choice for rapid development. Python also boasts an extensive standard library and a rich ecosystem of third-party packages, facilitating the integration of various functionalities without the necessity of developing from scratch.

Python's compatibility with numerous databases is another reason for choosing it for our project. Especially, its harmonious working relationship with MongoDB, facilitated by the MongoDB Python Connector API, is instrumental in managing our database operations.

#### Flask

Flask, a micro web framework written in Python, is another valuable asset to our project. Its lightweight nature allows for rapid development while its modularity offers the flexibility we require. Despite its simplicity, Flask provides a potent platform for developing a robust web server.

One of the defining features of Flask is the minimal setup required to get a basic web server up and running. Coupled with an inbuilt routing system that simplifies the defining of API endpoints, Flask proves to be a quintessential tool for our project.

Furthermore, Flask's extensibility via plugins provides an adaptable system where we can incrementally add functionalities as per our project's requirements. User authentication, form validation, and other advanced features can thus be seamlessly integrated without overcomplicating our application.

#### MongoDB

MongoDB, a NoSQL database, has been chosen for our project owing to its inherent flexibility and scalability. Its schema-less nature is particularly advantageous, facilitating diverse data structures that can adapt to the evolving requirements of our project. MongoDB's capacity to store, query, and process large amounts of data in diverse formats aligns perfectly with the interactive nature of our game application.

The MongoDB Python Connector API provides an effective bridge between our Flask server and the database. This API ensures efficient handling of client requests, and smooth invocation of model interactions with the database by the server.

#### Working Together

Moreover, these technologies enable swift implementation. Python, Flask, and MongoDB have been designed to work seamlessly together, which makes the development process efficient and relatively straightforward.

Furthermore, the SaaS platform that we've chosen for deployment has a pre-configured environment ready for a Flask application and MongoDB, which makes our application deployment process even more effortless. This streamlined deployment pipeline allows us to focus more on the development and less on configuration, thereby accelerating our time to market.

## 4 Components & Modules

### 4.1 Client Side

For frontend development, this project adopts a component-based approach to create modular and reusable UI elements. Components are self-contained modules that encapsulate both the visual and functional aspects of a specific feature or UI element.

#### Components

- `Navbar`: A navigation bar which displays the website logo and holds the login button.
- `LoginModal`: A modal with a login form for the user to sign in or navigate to the Register page.
- `Register`: Displays a form which the user can use to create an account for the website.
- `Leaderboard`: Displays the top 100 players' scores for a specific puzzle.
- `PlayHistory`: Displays the player's last 10 games' scores and the time when the puzzles were played.
- `WordsContainer`: Displays the list of words the player needs to find from a specific puzzle.
- `GameGrid`: Displays the 2D puzzle grid where the letters blocks are hidden. This component allows the player to interact with the game.
- `Timer`: Displays the time the user has taken solving a puzzle.

### 4.2 Server Side

The Flask server receives API requests from the client and directs them to the appropriate endpoints. If a model is needed within an API endpoint function, the model is invoked. Subsequently, the model communicates with the database through the MongoDB Python Connector API.

#### API Routes Module

This module encompasses all API endpoints that Flask can handle. It consists of the following components:

- `Auth`: Manages user authentication functions such as login, logout, account deletion, and retrieval of user information and game history.
- `Game`: Handles game-related functions such as retrieving game data, completing a game, and sharing the score on the leaderboard.
- `Leaderboard`: Retrieves the leaderboard data for a specific game.
- `Error Handler`: Manages all unexpected requests.

#### Models Module

MongoDB, being a NoSQL database, is considered schemaless. This necessitates pre-defining the data structure before inserting data into MongoDB. This module contains all model configurations and serves as a connector between the API endpoint functions and MongoDB. The components include:

- `User`: Stores user-related information such as username and password.
- `Game`: Stores game data such as puzzle characters, puzzle size, and creation time.
- `Game History`: Records game history, including user ID, game ID, and timestamps.
- `Leaderboard`: Maintains leaderboard data for each game.

## 5 UI Design

### 5.1 User Interface Components

#### 5.1.1 Landing Page

The Landing Page serves as the main entry point for users and provides access to key features of the application, such as logging in, viewing leaderboards, accessing play history, and selecting games to play.

- **User Authentication**
  - A `Login` button.
  - Clicking the `Login` button opens a modal for users to log in or register for an account.

- **Leaderboard** 
  - A large leaderboard displays the top 100 scores of the today's reward game.
  - A `Refresh` button to refresh the data.

- **Play History (Visible after user login)**
  - A list of the user's last 10 games is displayed.
  - Clicking on an item in the play history allows users to replay that game and attempt to achieve a higher score (except the today's reward game).
  - Clicking on the `Full History` opens a modal with all game histories.

- **Normal Game**
  - A button for users to play "Normal Game" directly.
  - Clicking the button immediately directs users to the game page.

- **Today's Reward Game**

  - A button for users to play "Today's Reward Game" directly.

  - Clicking the button immediately directs users to the game page.
- **Design Puzzle **
  - Clicking the button immediately directs users to the "Design Puzzle" page.

#### 5.1.2 Design Puzzle

Users are able to design their own puzzles on this page. The page has a form that contains:

- **Input Text and Level Selection**
  - A text input field for users to enter comma-separated single words (e.g. cat, dog, fish. Validation for no blank exists within commas is needed here).
  - A selection menu for users to choose the desired puzzle level (1-3 only).
- **Confirm Button and Puzzle Generation**
  - A `Confirm` button to submit the input text and level information to the backend.
  - The backend receives the information, generates a puzzle, and sends it back to the client via Ajax.
  - The generated puzzle is displayed to the user.
- **Puzzle Modification**
  - Users will not have the ability to modify the "puzzle", what they can do is modify the input text or level and resubmit again, see details below.
  - There are two buttons, `Confirm` and `Regenerate`. If the user is not satisfied with the generated puzzle, they can either click the `Regenerate` button again or modify the input text and level, then click the `Confirm` button again to submit their updated design. If the user is satisfied with the generated puzzle, they can directly click the `Confirm` to submit their puzzle (to store in the database so others can play this game).

#### 5.1.3 Game UI

The Game UI allows users to play the game, view the words they need to find, see the leaderboard for the current puzzle, and submit their scores to the leaderboard.

- **A List of Words need to be Found**
  - Displays all words that need to be found in the game.
  - When a word is found, it is removed from the list.
- **Puzzle Leaderboard**
  - Displays the leaderboard for the current puzzle.
  - Provided by the backend via API request.
- **Puzzle Grid**
  - All game logic will be implemented and be executed here.
  - A square grid with each cell containing a letter.
  - Users click on cells to select letters.
  - When a selected sequence matches a word in the need-to-find-words list, the word is removed from the list.
  - When all words are found:
    1. Notify the user,
    2. Send game data to the backend to get the score, backend will perform algorithm to detect cheating,
    3. Display the final score to user,
    4. Display a button for users to upload their scores to the leaderboard (with the option to submit anonymously).
- **Time Counter**
  - Displays the elapsed time for the current game.
- **New Game Button (Normal Game Only)**
  - Allows users to start a new game with another puzzle at the same level.
- **Switch Level Button (Normal Game Only)**
  - Offers two selections for users to switch to a different level and start a new game.

#### 5.1.4 User Account Management

Due to the time constraints, users can only register for an account, use login, logout, and delete account functions.

## 6 Interface Specifications and Protocols

### 6.1 Client-Server Interaction

The client and server will interact via a RESTful API, leveraging JSON data and JWT for communication. The details of the API endpoints are outlined below. Comprehensive details can be found in the **API Endpoints Documentation**.

#### 6.1.1 Public/Common Endpoints

- `/status`: Checks the connection and status of the backend server.

#### 6.1.2 User Authentication Endpoints

- `/auth/login`: Authenticates users using their username and password.
- `/auth/logout`: Handles user logout operations.
- `/auth/register`: Registers a new account in the database.

#### 6.1.3 User Account Endpoints

- `/auth/user/profile`: Retrieves the user's profile.
- `/auth/user/gamehistory`: Retrieves the user's game history.
- `/auth/deleteaccount`: Deletes a user account from the database.

#### 6.1.4 Game Endpoints

- `/game/normalpuzzle/<level>`: Fetches the game data for a standard game of a specified difficulty level and a game history ID.
- `/game/dailypuzzle`: Fetches the game data for today's reward game and a game history ID.
- `/game/key/<game_id>`: Retrieves the key answer for a specific game using the game ID.
- `/game/finish/<game_history_id>`: Ends a game using the game history ID and retrieves the final score.

#### 6.1.5 Leaderboard Endpoints

- `/leaderboards/dailypuzzle`: Fetches the leaderboard data for today's reward game.
- `/leaderboards/normalpuzzle/<game_id>`: Fetches the leaderboard data for a specific standard game using the game ID.

## 7 Data Structures and Algorithms

### 7.1 MongoDB Model Data Structures

The database will store the necessary information to support the application's functionality, including user data, game data, and leaderboards. We will use MongoDB as the database management system, which is a NoSQL database optimized for scalability and flexibility.

#### 7.1.1 Collections

##### 7.1.1.1 User

The User collection is designed to house user account details, encompassing the following fields:

- `_id`: This is a User ID automatically generated by MongoDB, serving as a unique identifier.
- `username`: This field stores the unique username chosen by the user.
- `password`: This field contains the hashed password for security purposes.
- `registration_date`: This datetime entry denotes the date when the user registered their account.
- `game_played`: This field keeps track of the total number of games played by the user.
- `reward_points`: This field represents the number of reward points the user has earned.

##### 7.1.1.2 Game

The Game collection is structured to house the specifics of individual game instances, comprised of the following fields:

- `_id`: This field houses the Game ID, which is a unique identifier automatically generated by MongoDB.
- `created_by`: This field indicates whether the game is created by an admin or a user. It will store "admin" if created by an admin or `user._id` if created by a user.
- `created_at`: This stores the creation date in a string format of "YYYY-DD-MM". Only date information is required.
- `customized`: This field indicates whether the game has been tailored by a user.
- `type`: This field specifies the type of game, whether it's a "normal" game or a "todaysrewardgame".
- `level`: This refers to the difficulty level of the game.
- `size`: This indicates the dimensions of the game puzzle.
- `puzzle`: This is a 2D array storing the characters of the puzzle.
- `words`: This field houses an array of words that need to be found within the puzzle.
- `key`: This consists of an array of JSON objects representing the answers.

##### 7.1.1.3 Game History

This collection will house the individual game history for users. The attributes to be stored include:

- `_id`: The unique identifier for game history, automatically generated by MongoDB.
- `user_id`: Identifier linking to the associated user.
- `game_id`: Identifier linking to the associated game.
- `finished`: A boolean field indicating whether the game has been completed.
- `valid_time_elapsed`: A boolean field to check if the time elapsed sent from the frontend matches the backend's record.
- `start_time`: The timestamp when the game data is requested.
- `end_time`: The timestamp marking the end of the game.
- `attempts`: The total number of attempts made if the game is completed.
- `score`: The final score achieved, available if the game is completed.

##### 7.1.1.4 Leaderboards

This collection will house leaderboard entries. The attributes to be stored include:

- `_id`: The unique identifier for each leaderboard, automatically generated by MongoDB.

- `game_id`: Identifier linking to the associated game.

- `leaderboard`: An array object that contains:
  - `game_history_id`: Identifier linking to the corresponding game history.
  - `username`: The username of the user who achieved the score.
  - `score`: The score achieved by the user.
  - `timestamp`: The timestamp of when this score was recorded.
  - `rank`: The rank of this particular score within the leaderboard of this game.

#### 7.1.2 Relationships

The relationships among the collections are as follows:

1. `User` and `Game History`: One-to-many relationship. A user can play multiple games and have many game histories, but each game history is associated with only one user (via `user_id`).
2. `Game` and `Game History`: One-to-many relationship. A game can have multiple game histories as many users can play the same game, but each game history is related to only one game (via `game_id`).
3. `Game` and `Leaderboards`: One-to-one relationship. Each game has a unique leaderboard associated with it (via `game_id`).
4. `Game History` and `Leaderboards`: One-to-many relationship. Each game history could potentially appear in the leaderboard if the score is high enough. However, the leaderboard will contain many game histories (via `game_history_id`).

#### 7.1.3 Indexing

For efficiency in query operations, certain fields in the database will be indexed:

- `User`: Index on `username` for quick lookup during authentication and game history queries. Index on `_id` for efficient user-specific queries.
- `Game`: Index on `_id` for efficient retrieval of game data. Index on `type` and `level` for fast querying of specific game types and levels.
- `Game History`: Index on `user_id` and `game_id` to quickly fetch all game histories related to a particular user or game. Index on `_id` for direct access to specific game history records.
- `Leaderboards`: Index on `game_id` for quick retrieval of leaderboard for a specific game. Index on `leaderboard.score` and `leaderboard.rank` for efficient sorting and retrieval of top scores.

### 7.2 Algorithms

#### 7.2.1 Prevent User From Cheating

In an ideal situation, all game stages and data processing would be conducted in the backend to prevent cheating. However, given the current constraints with our development team size and timeframe, we've chosen to implement the game logic on the frontend using JavaScript. Despite this, we've devised a strategy to mitigate potential cheating as much as possible, as detailed below:

Our game's scoring system takes into account variables such as difficulty level, time elapsed, and number of attempts used - all of which are recorded on the frontend and transmitted to the backend via API. As this leaves the door open for potential manipulation of these variables by savvy users, we've developed a specific algorithm to catch inconsistencies and irregularities.

When a user initiates a game, the frontend will request the necessary game data from the backend. Along with generating this game data, the backend will also create a game history record. This record contains the `start_time` and `game_id`, which provides access to information such as the difficulty level of the game. Upon finishing the game, the frontend will use this `game_history_id` to request the backend to finalize the game, along with the time elapsed and the number of attempts made.

In the backend, we've recorded the `start_time` and the `end_time` (when the request to finish the game is received), enabling us to calculate the actual `time_elapsed` and compare it with the `time_elapsed` value sent from the frontend. If there's a significant discrepancy between these two values, we will deem it as an instance of cheating, and the user's score will default to 0.

Similarly, to counter manipulation of the number of attempts, we'll send an automatic request to the backend each time the user hits the confirm button. This will allow us to keep an accurate record of the actual attempts made and compare it with the figure sent from the frontend to identify cheating attempts.

Although this system isn't foolproof and can still be circumvented by blocking the request for recording attempts, it represents our best effort under the current circumstances. Should more resources or time become available, we aim to fully implement the game logic in the backend to further bolster anti-cheating measures.

#### 7.2.2 Score Calculation

The final score for a game is calculated by the backend when it receives a request to finish the game. The calculation takes into account several variables and their corresponding weights. These variables are `time_elapsed`, `attempts`, and `difficulty_level`.

```python
base_score = 2000
time_elapsed_penalty = 0.005 # penalty per ms
attempts_penalty = 10 # penalty per attemp

if level == 1:
    level_multiplier = 1
elif level == 2:
    level_multiplier = 1.5
elif level == 3:
    level_multiplier = 2

score = (base_score - time_elapsed * time_elapsed_penalty - attempts * attempts_penalty) * level_multiplier

# to prevent negative score
return max(0, score)
```

## 8 Testing and Quality Assurance Plan

More details can be found in the **Testing and Quality Assurance Plan**.

### 8.1 Testing Objectives

- Ensure the application meets functional requirements and specifications.
- Validate the correctness and reliability of the application.
- Identify and resolve any defects or issues before the application is released.

### 8.2 Testing Levels

#### 8.2.1 Unit Testing

- Test individual components, functions, or modules in isolation.
- Use appropriate testing frameworks for the frontend (e.g., Jest) and backend (e.g., pytest).
- Automate unit tests to facilitate continuous integration and early defect detection.

#### 8.2.2 Integration Testing

- Test the interaction and communication between different components or modules.
- Ensure that the integrated system works correctly and meets the specified requirements.
- Test API endpoints to validate correct data flow between frontend and backend.

#### 8.2.3 System Testing

- Test the entire application as a whole, including frontend, backend, and database.
- Perform end-to-end testing to ensure the system meets functional and non-functional requirements.
- Test user scenarios and workflows to validate the application's overall functionality and usability.

### 8.3 Testing Methodologies

#### 8.3.1 Manual Testing

- Test the application manually to identify defects, usability issues, and unexpected behavior.
- Perform exploratory testing to uncover issues that may not be detected by automated tests.

#### 8.3.2 Automated Testing

- Develop automated test scripts to validate the application's functionality and performance.
- Integrate automated tests into the continuous integration and deployment pipeline.

#### 8.3.3 Performance Testing

- Test the application's performance under various conditions, such as high load or concurrent users.
- Identify potential bottlenecks and optimize the application for better performance and scalability.

### 8.4 Testing Tools and Frameworks

- Frontend testing: Jest, React Testing Library, Selenium (for end-to-end testing).
- Backend testing: pytest, Postman (for API testing), locust (for performance testing).

### 8.5 Test Plan and Schedule

- Collaborate with the QA engineer to develop a comprehensive test plan, including test cases, test data, and expected results.
- Schedule testing phases in coordination with the project timeline and milestones.
- Regularly review test results and address any defects or issues identified during the testing process.

## 9 User Documentation Requirements

### 9.1 Tutorial

For the benefit of new players, we will incorporate a tutorial and game instruction guide into the gameplay. This feature is designed to help players familiarize themselves with the game's mechanics and overall functionality.

### 9.2 Help Documentation

Due to time constraints, we will be unable to provide comprehensive help documentation at the initial launch of the game.

### 9.3 Frequently Asked Questions (FAQs)

Similar to help documentation, we also will not be able to provide a Frequently Asked Questions (FAQs) section initially due to the time limitations. However, we recognize the importance of such features for user support and will consider adding them in future updates.

## 10 Deployment and Maintenance Approach & Measures

### 10.1 Deployment Approach

The deployment of our game will proceed through several stages:

- **Development Environment**: In this phase, our application is built and tested extensively. The frontend of the application is developed using React and JavaScript, while the backend is crafted with Flask and Python. MongoDB is used as our database.
- **Staging Environment**: After the initial development, the application is transitioned to a staging environment. This environment serves as an exact clone of the production environment, and it enables us to confirm that our software and configurations function as expected before proceeding to production.
- **Production Environment**: Upon confirming that our application operates as anticipated in the staging environment, we move it to the production environment. In this stage, the application becomes publicly accessible.

### 10.2 Deployment Tools and Techniques

We will leverage Git for version control, which allows us to track changes, manage branches, and effectively handle collaboration among the development team.

For deployment, we will host our application on a Software as a Service (SaaS) platform. By using a SaaS platform, we benefit from simplified infrastructure management, as environment details are handled by the platform itself. Given that our client and backend server are two separate services communicating via API, we will ensure the efficiency of API calls by deploying them separately on the same cloud server.

We also plan to implement a Continuous Integration and Continuous Deployment (CI/CD) pipeline, which will automate the process of integrating changes, testing them, and preparing them for release to production.

### 10.3 Maintenance Measures

Maintenance is an essential aspect of ensuring the ongoing operation and success of the game. Here are the key measures we will undertake:

- **Monitoring**: We will institute logging and monitoring to proactively identify and resolve potential issues. Alerts will be set up to notify us of critical events.
- **Performance Tuning**: Performance tuning will be carried out regularly, based on user feedback and monitoring data, to ensure the system operates at peak efficiency.
- **Security Updates**: We will keep abreast of security best practices and promptly apply patches or updates as they become available. This way, we can safeguard our application from potential threats and vulnerabilities.
