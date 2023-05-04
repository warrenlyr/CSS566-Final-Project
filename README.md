# CSS566-Final-Project

**TO TEAMS**: please commit your changes using corresponding branches:

- Documentation related updates: doc
- Backend source code related updates: backend
- Frontend source code related updates: frontend
- Testing source code related updates: testing

All changes will be reviewed and merged to the master branch.

## Team Information
CSS 566 Software Management

Spring 2023, University of Washington Bothell

Team: Purple Kitty Squad

Stakeholders:

- Barack Liu (Product Owner)
- Warren Liu (Lead Developer/Architecture, backend developer)
- Haihan Jiang (QA Engineer)
- Shahruz Mannan (Sprint 1 Scrum Master, frontend developer)
- Amalaye Oyake (Sprint 2 Scrum Master)
- Arsheya Raj (Designer, UI developer)

## Objective of The Project
The primary objective of this project is to develop a straightforward Word Search game. Instead of emphasizing software development, the project seeks to provide an opportunity to experience the Scrum management framework.

## Toolsets
- Backend language: Python
- Web server: Flask
- Frontend language: HTML, JavaScript, CSS
- Frontend UI framework: React.js
- Project management tool: Jira (Scrum)

## Local Environment Setting Up
The application consists of a frontend, backend, and database. The different parts can be set up manually. 

### Frontend

The frontend is built using Node.js, currently actively tested with version 18.16. The simple manual setup requires the following steps.

#### 1 Download and Install Node.js

Download link: https://nodejs.org/en, use the "Recommended For Most Users" version.

<img src="./images/NodeJS Installer.png">

To validate the installation, open a terminal and type `node -v`, you'll see the version number if Node.js is installed correctly.

<img src="./images/NodeJS Version Check.png">

#### 2 Install Required Dependencies

Same commands for Windows, MacOS, and Linux.

First, navigate to the project folder in the terminal. e.g. `<Your Local Path>/CSS566-Final-Project/`.

```bash
# Install the required dependencies and build the client environment

# Change to the source -> Node.js client folder
cd src/client

# Install dependencies
npm install
```

#### 3 Start the NodeJS Client Server

Once all dependencies are installed without error, start the frontend Node.js client server.

```bash
# Start the frontend client server
npm start
```

Wait for the server to be started. Once all services are started, a new page will be opened in the default browser as shown below.

<img src="./images/NodeJS Server.png" width="1280">
