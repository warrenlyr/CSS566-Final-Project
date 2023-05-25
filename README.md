# CSS566-Final-Project

## Team Information

CSS 566 Software Management

Spring 2023, University of Washington Bothell

Team: Purple Kitty Squad

Stakeholders:

- Barack Liu (Product Owner)
- Warren Liu (Lead Developer/Architecture, backend developer)
- Haihan Jiang (QA Engineer)
- Shahruz Mannan (Sprint 1 Scrum Master, frontend developer)
- Amalaye Oyake (Sprint 2 Scrum Master, QA Engineer)
- Arsheya Raj (Designer, frontend developer)

## Objective of The Project

The primary objective of this project is to develop a web-based straightforward Word Search game. <u>Instead of emphasizing software development, the project seeks to provide an opportunity to experience the Scrum management framework.</u>

In constructing the Word Search Game, we leveraged React and Node.js for the frontend client, while Flask was utilized for the backend server with RESTful API deployed for communication. All data was preserved in the MongoDB Atlas cloud.

- The rationale behind this project can be found in the PRD document within the Documentation folder.
- Detailed implementation information can be obtained from the SDD and API Endpoints Document housed in the Documentation folder.
- For an understanding of the UI/UX design, please refer to the Wireframe UI Document located in the Documentation folder.

## Toolsets

- Backend Language: Python
- Backend Web Server Framework: Flask
- Frontend Language: HTML, JavaScript, CSS
- Frontend UI Framework: React.js
- Project Management Tool: Jira (Scrum)

## Local Environment Setting Up

The application consists of a frontend, backend, and database, all of them should be running at the same time so the application can be executed correctly. The different parts can be set up manually.

### Requirements

- Python 3.10+
- Node.js 18.16+

### Frontend

The frontend is built using `Node.js`, currently actively tested with `version 18.16`. The simple manual setup requires the following steps.

#### 1. Download and Install Node.js

Download link: https://nodejs.org/en, use the "Recommended For Most Users" version.

![NodeJS Installer](./images/NodeJS%20Installer.png)

To validate the installation, open a terminal and type `node -v`, you'll see the version number if Node.js is installed correctly.

![NodeJS Installer](./images/NodeJS%20Version%20Check.png)

#### 2. Install Required Dependencies

Same commands for Windows, MacOS, and Linux.

First, navigate to the project folder in the terminal. e.g. `<Your Local Path>/CSS566-Final-Project/`.

```bash
# Install the required dependencies and build the client environment

# Change to the source -> Node.js client folder
cd src/client

# Install dependencies
npm install
```

#### 3. Start the NodeJS Client

Once all dependencies are installed without error, start the frontend Node.js client with either of the commands:

```bash
# Start the development environment
npm run start:dev

# Start the production environment
npm run start:prod
```

Wait for the client to be started. Once all services are started, a new page will be opened in the default browser as shown below.

![NodeJS Installer](./images/NodeJS%20Server.png)

### Backend

The backend is built using pure `Python` and its popular microframework `Flask`, currently actively tested with `Python 3.11` and `Python 3.10`, and `Flask 2.3.2`. The simple manual setup requires the following steps.

#### 1. Download and Install Python

Download Link: https://www.python.org/downloads/, please select the newest version of either 3.11 or 3.10, then select a installer based on your OS (e.g. Windows installer (64-bit) for Windows, and macOS 64-bit universal2 installer for MacOS).

To validate the installation, open a terminal and type:

Windows

```bash
# If you have only one version of Python installed
py --version

# If you have multiple versions of Python 3 installed e.g. Python 3.6-3.11
py -3.11 --version
```

MacOS/Linux

```bash
# If you have only one version of Python installed
python --version

# If you have multiple versions of Python installed e.g. Python2, Python3, 
# but only one version of Python 3 installed e.g. only Python 3.11
python3 --version

# If you have multiple versions of Python 3 installed e.g. Python 3.6-3.11
python3 -3.11 --version
```

You'll see the version number if Python is installed correctly.

![NodeJS Installer](./images/Python%20Version.png)

#### 2. Install Virtual Environment (Recommended But Not Required)

First, navigate to the project folder in the terminal. e.g. `<Your Local Path>/CSS566-Final-Project/`.

```bash
# Change to the source folder
cd src
```

Windows

```bash
# Create venv in Python
py -3.11 -m venv venv # change 3.11 to 3.10 if your are using Python 3.10

# Activate venv
./venv/Scripts/activate.bat # or ./venv/Scripts/activate.bat, try both if one is not working
```

MacOS/Linux

```bash
# Create venv in Python
python3 -3.11 -m venv venv # change 3.11 to 3.10 if your are using Python 3.10

# Activate venv
source ./venv/bin/activate
```

For more information, see https://docs.python.org/3/tutorial/venv.html.

#### 3. Install Required Packages

First, please make sure you have the `requirements.txt` in the src folder.

![Python Required Packages](./images/Python%20Required%20Packages.png)

Then make sure your terminal is now in the src folder, you should be fine if you have gone through step 2. Type the following command to install all required packages:

Windows/MacOS/Linux

```bash
pip install -r requirements.txt
```

#### 4. Start the Flask Server

Once all packages are installed and you are still in the src folder, type the following command to start the Flask application:

Windows

```bash
py app.py
```

MacOS/Linux

```bash
python3 app.py
```

You should see something as shown in the image below indicating that the Flask application is running:

![NodeJS Installer](./images/Flask%20Server%20Running.png)

Now navigate to http://127.0.0.1:5000 in your browser, you'll see a webpage without error if the Flask application is running correctly.

### Database

Our project utilizes MongoDB as the primary database solution.

Specifically, we leverage MongoDB Atlas, an online database service provided and managed by MongoDB. This means we don't need to install the database locally, which simplifies our setup and maintenance processes.

We interface with our Atlas database through the MongoDB Python connector within our Python code. In addition, we use MongoDB Compass, a powerful GUI application, for direct interactions with the database.

For instructions on how to connect to a MongoDB database, please refer to this link: https://www.mongodb.com/try/download/compass.

While we utilize the cloud-based MongoDB Atlas, you may also choose to install MongoDB on your local system if it better suits your needs. The official documentation for this process can be found here: https://www.mongodb.com/try/download/community-kubernetes-operator.

## Testing

### Installation

1. Install Jest, the main testing framework:

```bash
npm install --save-dev jest
```

2. Install React Testing Library to render React components, fire events, and make assertions about the result:

```bash
npm install --save-dev @testing-library/react
```

3. Install Jest DOM to provide custom Jest matches for better assertions on the DOM:

```bash
npm install --save-dev @testing-library/jest-dom
```

4. Install Babel and its presets to transpile your JavaScript code so that Jest can understand it:

```bash
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react
```

5. Install Babel plugin to transform ES6 modules to CommonJS, as Jest currently does not understand ES6 module syntax:

```bash
npm install --save-dev @babel/plugin-transform-modules-commonjs
```

6. Install Jest Fetch Mock to mock the fetch function in your tests, if you're using fetch for API calls:

```bash
npm install --save-dev jest-fetch-mock
```

### How to Run

1. set the environment variable

```bash
export PYTHONPATH="<location_of_src_directory>" # Mac or linux | Put path of src ""
```

```bash
$env:PYTHONPATH="<location_of_src_directory>" # Windows | Put path of src ""
```

2. cd to `CSS566-Final-Project/src/client`

```bash
npm test
```

The application has style checking using [eslint][eslint] for the frontend.

```bash
# Run style checking for the frontend
cd client/
npm run lint
```


### Testing Guide

Prerequisites: PYTHONPATH="<location_of_src_directory>"

This guide provides instructions for running tests using pytest for the project. The project contains the following test files:
- `test_auth.py`: Tests for the authentication module.
- `test_leaderboards.py`: Tests for the leaderboards module.
- `test_user.py`: Tests for the user module.

Before running the tests, make sure you have pytest installed.

To run the tests, navigate to the root directory of the project in your terminal.

```bash
cd path/to/project


[eslint]: https://eslint.org/
