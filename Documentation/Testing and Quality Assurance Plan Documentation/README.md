# Testing and Quality Assurance Plan

CSS 566 Software Management

Spring 2023, University of Washington Bothell

Team: Purple Kitty Squad

Author: Haihan Jiang

Roles:

- Barack Liu (Product Owner)
- Warren Liu (Lead Developer/Architecture/Backend Developer)
- Haihan Jiang (QA Engineer)
- Shahruz Mannan (Sprint 1 Scrum Master/Frontend Developer)
- Amalaye Oyake (Sprint 2 Scrum Master/QA Engineer)
- Arsheya Raj (Designer/Frontend Developer)

## 1. Introduction

### 1.1 Purpose

This document outlines the Quality Assurance Plan for the software development for the new version of the Roaming Kitty website developed by the University of Washington “Purple Kitty Squad” software development team.

Roaming Kitty is an archived blog of self-published stories. The stories range from current trends, music interests, as well as science fiction. The updated website features a playable game, similar in feel to Wordle, but in the form of a word-search game.

An important aspect of announcing the game to users is ensuring that the rollout of the new website is free of hiccups. This Quality Assurance plan describes the approach and methodology adopted by our team to ensure high-quality software is developed, along with adequate functionality. 

### 1.2 Scope

Our project aims to develop a word-search game using Python, the flask framework for the backend, React for the front-end, and MongoDB as the database. The game will provide an interactive and engaging experience for users, allowing them to participate in a word-search puzzle that is a mix of Wordle and traditional paper word-search games. Users will be able to see their daily progress, and compare their scores with other players. The scope of this Quality Assurance (QA) document is to outline the testing activities and ensure the successful implementation of the project.

![](.\images\Word Search Game.png)

## 2. Quality Assurance Methodology

Our Quality Assurance plan is to enhance the overall quality and reliability of the new software we have developed for the Roaming Kitty website. The key aspects of our plan will include increasing test coverage by having a high assertion density, using the GitHub Bug tracking features, implementing end-to-end testing, maintaining a 1-to-1 mapping of verification activities to the product requirements, conducting code reviews, and dispositioning user feedback.

Adopting these practices will minimize deployment issues during the product roll-out. By achieving these key results, the aim is to ensure a robust and stable website that delivers a seamless user experience while maintaining a high level of reliability.

![](.\images\High-level view of QA test plan.png)

### 2.1 **Coding Guidelines and Code Reviews**

The software development uses React JS (JavaScript) for the frontend and Python for the Backend. Our team is adopting several coding guidelines for each respective language that will help ensure code readability, maintainability, and consistency.

As part of our quality assurance plan, we shall conduct regular code reviews as a key part of our software development workflow. The code reviews will ensure that we adhere to the coding standards and best practices listed below.

**Naming Conventions:**

- Use camel case for variable and function names (e.g., myVariable, myFunction).
- Use PascalCase for component names (e.g., MyComponent).
- Prefix boolean variables with "is" or "has" (e.g., isActive, hasError).
- Use ALL CAPS for CONSTANTS

**Code Organization and Modularization:**

- Break down complex components into smaller, reusable components.
- Group related files and components in appropriate directories.
- Aim for a clean and intuitive interface (avoid indirection).

**Indentation and Formatting:**

- Use consistent indentation for code blocks.
- Limit line length to a reasonable number of characters

**Variable Declarations:**

- Use const for constant variables.
- Declare variables as close to the first usage.

**Function Declarations:**

- Use explicit function declarations for methods and event handlers.

**Component Structure and Lifecycle:**

- Follow a consistent component structure, 
- Use abstraction and separation of concerns.
- Use built-in lifecycle methods for managing component state

**Handling Events:**

- Use camel case for event handler names (e.g., onClick).
- Bind event handlers in the component constructor.

**State Management:**

- Utilize built-in state management capabilities.

**Documentation and Comments:**

- Include comments to for functions, algorithms, code blocks

### 2.2 Frontend (Client Side) QA Methodology

For testing the frontend, our team has adopted Jest. Jest is an open-source JavaScript and React testing framework used at Facebook. It provides a complete QA API for testing JavaScript projects. The methodology involves three main steps: test setup, test execution, and result analysis.

The client tier consists of a web-based user interface that allows users to interact with the application, select and play games, create customized puzzles, manage their user accounts, and view leaderboards.

During the test setup, we shall utilize Jest's capabilities to define a set of test suites and individual test cases. Test suites are organized collections that are scoped to similar activities. Test cases represent specific scenarios for evaluation. An important part of setting up tests is ensuring that we have adequate assertion density. Ideally, there should be a 1-to-1 mapping between a test case and a product requirement.

![](.\images\example of a jest test.png)

### 2.3 Backend (Server Side) QA Methodology

The Server-side code is developed using Python and the Flask web application microframework, exposing a RESTful API for client-tier interactions. The testing approach for the server tier of the application will the the components responsible for managing user sessions, generating random puzzles, and handling API requests from the client tier. 

Pytest-flask will be used as the testing framework for the server tier. Pytest-flask is a Pytest plugin that provides additional features for flask-based applications. It provides flask specific test hooks and uses the syntax and feature set of pytest.

The testing framework will be used to test the following scenarios:

- Authenticating and authorizing user access
- User session management
- Successful generation of random puzzles
- Successful API invocation and responses
- Testing function input bounds
- RESTful API Functionality
- Successful MongoDB operations
- Off-nominal conditions
- Application bring-up, and tear-down
- Persistence of user data
- Capturing of performance metrics

### 2.4 Database QA Methodology

The data tier is responsible for storing and managing application data, such as user information, puzzle data, and user scores. It consists of a database system, the NoSQL database (MongoDB). The server tier interacts with the data tier through a data access layer, which abstracts the database operations and provides a consistent interface for data manipulation.

- Key responsibilities of the data tier include:
- Storing user information, puzzle data, and user scores
- Managing data integrity and consistency
- Ensuring data security and privacy
- Providing data access and query capabilities to the server tier

## 3. Testing

**Existing Test cases:** https://docs.google.com/spreadsheets/d/1AcjqQIGQhIO0JxxCMDS6p_vxp44kBgymMXpfD8uKLOk/edit#gid=0

### 3.1 Testing Objectives

**Objective**: Ensure the reliability and robustness of the Word Search game application.

- **Complete Functional Testing**: Verify that all application features as described in the project document are functioning as expected. This includes user registration and login, game selection, gameplay, leaderboard display, puzzle customization, and leaderboard functionality.
- **Ensure Performance**: Test the application under different levels of user load and verify that it performs well under stress. Measure response times for different actions and ensure they are within acceptable limits. Generally controlled API response time under 1000ms.
- **User Interface Testing**: Verify that the user interface is intuitive and responsive. Check that the application displays correctly on different screen sizes and devices.
- **Error Handling and Robustness**: The application includes handling incorrect user inputs and unexpected server responses. Ensuring that users and developers could receive different types of error status codes based on different errors.

### 3.2 Test Items

The Word Search game consists of the following components that need testing:

- Frontend UI (Landing page, Game UI, Puzzle Design, User Account Management)
- Backend Server (Authentication, Game Data Management, Puzzle Generation)
- Database (User, Game, Game History, Leaderboard collections)

### 3.3 Features to be Tested

Here are the main features of the Word Search game that we will focus on during our testing:

- User Authentication: Registration, login, logout
- Game functionality: Game selection, gameplay, score submission, puzzle design
- Data management: Storing and retrieving user data, game data, leaderboard data
- Error handling: Proper responses and handling when an error occurs
- Backend functions: Authentication, data management, puzzle generation

### 3.4 Testing Levels

#### 3.4.1 Unit Testing

- Test individual components, functions, or modules in isolation.
- Use appropriate testing frameworks for the frontend (e.g., Jest) and backend (e.g., pytest).
- Automate unit tests to facilitate continuous integration and early defect detection.

#### 3.4.2 Integration Testing

- Test the interaction and communication between different components or modules.
- Ensure that the integrated system works correctly and meets the specified requirements.
- Test API endpoints to validate correct data flow between the frontend and backend.

#### 3.4.3 System Testing

- Test the entire application as a whole, including frontend, backend, and database.
- Perform end-to-end testing to ensure the system meets functional and non-functional requirements.
- Test user scenarios and workflows to validate the application's overall functionality and usability.

## 4. Testing Methodologies

### 4.1 Manual Testing

- Test the application manually to identify defects, usability issues, and unexpected behavior.
- Perform exploratory testing to uncover issues that may not be detected by automated tests.

### 4.2 Automated Testing

- Develop automated test scripts in the PyTest framework to validate the application's functionality and performance.
- Integrate automated tests into the continuous integration and deployment pipeline.

### 4.3. Performance Testing

- Test the application's performance under various conditions, such as high load or concurrent users execution.
- Identify potential bottlenecks and optimize the application for better performance and scalability.

## **5**. Testing Tools and Frameworks

- Frontend testing: Jest, React Testing Library, Selenium (for end-to-end testing).
- Backend testing: pytest, Postman (for API testing), locust (for performance testing).
- Frontend Style Checking: Eslint style checker

## **6**. Test Schedule

<img src=".\images\test process.png" height="600" />

In order to ensure the smooth and efficient execution of the testing phase, it is imperative to establish a comprehensive test schedule. This task entails close collaboration with the development team to synchronize the testing activities with the project's overall timeline and milestones.

To maintain a high standard of quality, it is essential to regularly evaluate the test outcomes and promptly resolve any defects or issues that arise during the testing process. Thoroughly reviewing the test results allows for the identification of any areas requiring improvement or adjustments.

- Collaborate with the QA engineer to develop a comprehensive test plan, including test cases, test data, and expected results.
- Schedule testing phases in coordination with the project timeline and milestones.
- Regularly review test results and address any defects or issues identified during the testing process.

## 7. Test Strategy

The testing will be conducted at different levels, including unit testing, integration testing, and system testing. Both manual and automated testing methodologies will be employed.

### 7.1 Test Levels

#### 7.1.1 Unit Testing

- Test individual components, functions, or modules in isolation.
- Use **Jest** for frontend testing and **pytest** for backend testing.
- Automate unit tests to facilitate continuous integration and early defect detection.

#### 7.1.2 Integration Testing

- Test the interaction and communication between different components or modules.
- Ensure the integrated system works correctly and meets the specified requirements.
- Test API endpoints to validate correct data flow between the front end and back end.

#### 7.1.3 System Testing

- Test the entire application as a whole, including frontend, backend, and database.
- Perform end-to-end testing to ensure the system meets functional and non-functional requirements.
- Test user scenarios and workflows to validate the application's overall functionality and usability.

### 7.2 Test Methodologies

#### 7.2.1 Manual Testing

- Test the application manually to identify defects, usability issues, and unexpected behavior.
- Perform exploratory testing to uncover issues that may not be detected by automated tests.

#### 7.2.2 Automated Testing

- Develop automated test scripts to validate the application's functionality and performance.
- Integrate automated tests into the continuous integration and deployment pipeline.

#### 7.2.3 Performance Testing

- Test the application's performance under various conditions, such as laptop and mobile browsers.
- Identify potential bottlenecks and optimize the application for better performance.

## 8. Test Cases

### 8.1 Frontend Test Cases

- Test the user interface elements, such as buttons, input fields, and navigation components.
- Test the game board generation and user interactions with the game board.
- Test the game timer and scoring functionality.
- Test the leaderboard display and user ranking updates.
- Test user registration, login, and authentication.

### Backend Test Cases

- Test the user authentication functionality, including registration and login.
- Test the game data management, such as storing and retrieving puzzles, user scores, and leaderboards.
- Test the puzzle generation algorithm, ensuring that generated puzzles meet level requirements.
- Test the API endpoints for proper communication between the front end and backend.
- Test the database design and data storage, ensuring data consistency and integrity.

## 9. Test Tools and Frameworks

- Frontend testing: Jest, React Testing Library, Selenium (for end-to-end testing).
- Backend testing: pytest, Postman (for API testing), locust (for performance testing).

### 9.1 flask-pytest

- pytest is a popular Python testing framework that is used for backend testing in this project. We shall be using pytest and the flask plugin (flask-pytest).
- It provides a simple and concise syntax for writing test cases and supports various plugins and extensions to enhance its functionality.
- It enables test discovery and execution, making organizing and running tests for the backend components easier.
- py test will be used for writing and executing unit tests for the backend components, ensuring the correctness and reliability of the application.

## 10. Test Deliverables

- Test plan document
- Test
- Cases and Scripts
  - Test data and expected results
  - Test environment setup and configuration
  - Test execution results and reports
  - Bug and issue reports
  - Test summary report

## 11. Test Environment

- Set up a dedicated testing environment that closely resembles the production environment.
- Ensure that all necessary dependencies, tools, and configurations are in place for testing.
- Prepare test data, including sample puzzles, user accounts, and leaderboard data.

## 12. Test Execution

- Execute the test cases and scripts according to the test schedule.
- Record test results, including any defects or issues discovered during testing.
- Retest any resolved issues to ensure that they have been properly addressed..

## 13. Test Evaluation and Reporting

- Analyze test results to identify trends and patterns in the application's behavior.
- Document any defects or issues discovered during testing, along with their severity and impact.
- Provide recommendations for resolving identified issues and improving the application's overall quality.
- Prepare a test summary report, detailing the test objectives, methodologies, results, and conclusions

## 14. Test Closure

- Review the test summary report with the development team and other stakeholders.
- Ensure all critical issues are addressed and resolved before releasing the application.
- Conduct a post-mortem analysis to evaluate the effectiveness of the testing process and identify areas for improvement in future projects.

By following this QA test plan, the Word Search Puzzle web application can be thoroughly tested and evaluated, ensuring a high-quality user experience and a reliable, functional product.

## 15. Summary

This Test Plan outlines the roles and responsibilities of the QA team members, including the test lead and software testers. It defines the test schedule, aligned with the project timeline and OKRs, to effectively allocate resources and ensure the timely execution of testing activities. Regular review of test results is emphasized, enabling the identification and resolution of any issues that may arise.

Overall, the QA Plan serves as a guiding document that establishes a structured approach to quality assurance, ensuring that this project meets the desired standards and the expectations of the Product Owner and the Customer. The plan contributes to the delivery of a high-quality, reliable product.
