# Product Requirements Document



## 1. Overview

CSS 566 Software Management

Spring 2023, University of Washington Bothell

Team: Purple Kitty Squad

Stakeholders:

- Barack Liu (Product Owner)
- Warren Liu (Lead Developer/Architecture, Backend Developer)
- Haihan Jiang (QA Engineer)
- Shahruz Mannan (Sprint 1 Scrum Master, Frontend Developer)
- Amalaye Oyake (Sprint 2 Scrum Master)
- Arsheya Raj (Designer, Frontend Developer)

## 2. Introduction

The goal of our software project is the development of an engaging online word search game aimed at enhancing the popularity of the Roaming Kitty website. Our objective is to develop an enjoyable online word search game that attracts players to the Roaming Kitty website. We strive to create an immersive gaming experience by offering varying levels of difficulty, daily rewards, and power-ups to increase user engagement.

The game will foster community interaction by combining familiarity and social interaction by users sharing their own puzzles. We prioritize accessibility and inclusivity, ensuring a smooth user experience across multiple platforms. Regular updates based on user feedback and support for multiple languages will improve the user experience.

## 3. Objectives and Key Results

Our objective is to create a game that not only captivates an online user like Milo, but also retains him as a regular player on Roaming Kitty. We plan to achieve this through the following OKRs:

- Enhance user engagement and retention: Increase platform usage, drive return visits, and grow the registered user base by offering captivating gameplay experiences. 
- Foster community interaction: Enable players to create, share, and discuss custom puzzles, fostering a strong sense of community within the platform. Also cater to changing preferences and skill levels.
- Ensure seamless gaming across devices: Prioritize smooth transitions between desktop, mobile, and tablet, ensuring uninterrupted gameplay.
- Prioritize accessibility and inclusiveness: Develop an inclusive game accessible to players of all abilities, allowing The User and friends to enjoy together.

The details of OKRs are as follows:

**Objective 1: Enhance user engagement and retention**

- Key Result 1.1: Increase the average time spent on the platform per user from 10 minutes to 12.5 minutes within three months of launch (by August 1st, 2023)
- Key Result 1.2: Reach a 30% return visitation rate by end of the year (by January 1st, 2024)
- Key Result 1.3: Increase the number of registered users by 15% (by November 1st, 2023)

**Objective 2: Use the game to enhance interaction by connecting puzzles to story themes.**

- Key Result 2.1: Develop and launch the custom word search feature within the first three months (by September 1st, 2023)
- Key Result 2.2: Connect the words in 100 generated puzzles to blog themes in the first six months of launch (by January 1st, 2024)
- Key Result 2.3: Achieve 1000 shared daily puzzle tweets after 180 days (by January 1st, 2024).

**Objective 3: Ensure a smooth and enjoyable gaming experience on various devices**

- Key Result 3.1: Optimize the game for desktop, mobile, and tablet devices upon the game's launch (by May 1st, 2023)
- Key Result 3.2: Maintain a 95%+ cross-browser compatibility rate (Safari and Chrome on Mac, Windows, Android, and iOS) within the second month of launch (by August 1st, 2023)
- Key Result 3.3: Achieve a page load time of under three seconds on all devices within the first three months of launch (by September 1st, 2023)

**Objective 4: Prioritize accessibility and inclusiveness for players**

- Key Result 4.1: Implement CVAA Title 1 conformance within the first three months of launch (by August 1st, 2023).
- Key Result 4.2: Achieve at least an 80% satisfaction rate among players with disabilities within six months of launch (by November 1st, 2023)
- Key Result 4.3: Obtain external certification or recognition for accessibility (e.g., Web Content Accessibility

## 4. User Stories

Imagine Milo, a devoted player, he logs into Roaming Kitty and is instantly greeted by our word search game. The excitement of exploration and discovery unfolds in front of him. His journey reflects the epitome of our vision – to deliver a user experience that is engaging, versatile, and player-centric.

Imagine him enjoying the game anywhere, any time. Whether he's lounging at home with his desktop, sipping coffee with his tablet, or traveling with his mobile device, our game stands ready to challenge his word-finding skills. This cross-device compatibility mirrors our business value of accessibility and flexibility, allowing the game to be a constant companion in Milo's diverse daily life.

Visualize Milo, after a thrilling game, eagerly viewing his final score and his rank among historical scores. His performance is not just a number, but a testament to his improvement, an echo of our business value of progress and personal achievement.

Picture Milo valuing his privacy. If he wishes, he can submit his scores anonymously, showing our commitment to user privacy and security - paramount in our business values.

Now, see him reviewing his historical scores after logging in, a visual narrative of his progress and improvements. This personal record embodies our business value of transparency and self-improvement.

Imagine him receiving daily credits just for logging in, displayed proudly on his profile. These tokens of appreciation highlight our business value of loyalty and consistency, rewarding Milo's daily engagement.

Envision Milo choosing his level of difficulty for each game. This choice empowers him, aligns with our business value of player agency, and ensures that every gaming experience is tailored to his preference.

Picture him utilizing power-ups and daily rewards to enhance his gaming experience. These bonus elements infuse an extra layer of excitement, reflecting our business value of constant engagement and surprise.

Imagine him seamlessly playing our game across various network environments. Whether he's at home, in a coffee shop, or on the move, our online games minimize data usage, reflecting our commitment to delivering smooth experiences even in challenging network conditions.

Finally, see Milo sharing his own words in the word search game and adding them to the game repository. This community involvement not only enriches his gaming experience but also underscores our business value of fostering a lively, participative user community.

## 5. Features

The features of the word search game on Roaming Kitty are not merely elements on a checklist. Instead, they are the embodiment of our objectives, meticulously designed to enhance the user experience, making the visit to our blog an adventure to look forward to.

Imagine a user navigating through the blog, exploring captivating content, getting lost in riveting stories, and simultaneously immersing themselves in a game that subtly unravels these themes. This seamless integration of reading and gameplay creates an enriching user experience, transforming a routine activity into an intriguing journey of discovery.

Next, consider the thrill of friendly competition. Our game introduces a leaderboard where users can see the Twitter handles of top performers. This is not just a list; it's a testament to the users' wit and skill, a stage where their achievements shine. The thrill of seeing their name climb up the leaderboard, outshining others, adds an exciting dimension to the game. 

But what fuels this competition? We have implemented a system that tracks multiple user metrics, creating a detailed landscape of user performance. This isn't merely a score-tracking mechanism, it's the pulse of the game, bringing to life a competitive atmosphere that's both riveting and engaging.

Lastly, simplicity and security go hand in hand on our platform. We respect our users' privacy, and thus, the website does not require much personal information. This approach not only simplifies user interaction with the platform, but also reinforces the security model, giving users peace of mind as they engage with Roaming Kitty. 

In this way, every feature of the Roaming Kitty word search game is purposefully designed to maximize user engagement, creating an environment that's enjoyable, competitive, and secure.

## 6. Functional Requirements

To enable our system to function properly, we need to achieve the functional requirements first. The main functional requirements are as follows:

**Multiple Difficulty Levels**

The game should offer different difficulty levels 5x5, 7x7, and 10x10 grids. Each difficulty level will have a different number of words to find and with each difficulty level, the hidden letters will be revealed for a different amount of time.

**Authentication**

The game should have an authentication system that allows users to log in or sign up using their username and password if the user wants to. The user is not required to log in.

**Leaderboard**

The game should have a leaderboard that displays the top 100 players depending on the difficulty level and game mode.

**Share Scores**

The player should be able to share their scores after completing a puzzle. They should have an option to share their scores anonymously if the player does not want to sign in or does not want to share their username with others.

**Game History**

The game should record the user’s score history. The player should be able to browse their most recently played games. These recent games should be replayable if the player wants to beat the previous score.

**Reward System**

To incentivize players to play daily reward games, they should receive daily credits when solving the daily puzzles that can be used as tokens on the Roaming Kitty website.

**Different Modes**

The game should have different modes such as normal puzzle, daily puzzle, and design puzzle.

**Customize Puzzle**

The user should be able to generate a custom puzzle from the user’s provided words. The user should also be able to tweet their custom generated puzzles.

**User Information**

The user should be able to see their user information. Additionally, the user should also be able to delete their account if necessary.

**Device Adaptability**

The game should be able to adapt to different devices including desktops and mobile devices.

**Multi-language Support**

The game should support multiple languages to cater to users from different parts of the world.

**Accessibility Features**

To ensure that players with disabilities can enjoy the game, it should incorporate accessibility features.

## 7. Non-Functional Requirements

Besides the functional requirements, we should also consider non-functional requirements. These non-functional requirements are as follows.

**Age-appropriate Content**

The game should be suitable for The User and other players over 12 years of age. An agreement box for age confirmation should be present.

**Performance** 

For an enjoyable gaming experience, the game should run in real-time on modern browsers without any lags.

**Accessibility**

To ensure that all players, including those with disabilities, can fully enjoy the game, it should provide accessible features.

**Cross-platform Accessibility**

Whether The User uses a PC, phone, or tablet, he should have access to the game.

**Scalability**

As the game grows in popularity, it should be able to handle 1,000 users at a given point in time.

**User-friendly**

The game should be easy to navigate, even for first-time players like The User.

**Data Optimization**

The game should be optimized for minimal data usage to respect The User's data limits.

**Continuous Improvement**

Based on user feedback and reported issues, the game should continually improve.

## 8. Assumptions and Constraints

At the heart of our planning and execution lie a set of fundamental assumptions and constraints that shape our path. Each one underscores the practical side of our vision and maps directly onto our business value: delivering an engaging word search game within a sustainable and realistic framework.

Consider our project team, a small but efficient squad of six members. Each member is committed to contributing six hours per week, the collective effort forming the cornerstone of our project. This limited yet skillful resource allocation mirrors our belief in working smart, not just hard.

Now, imagine the fiscal constraint - our entire project budget stands at $60. It may seem daunting at first glance, but it embodies our commitment to deliver exceptional value within a minimal budget, a testament to our efficient financial management and innovative thinking.

Next, envision the technology that forms the backbone of our platform - a harmonious blend of JavaScript, Python, HTML, and CSS. These languages, while different in nature, work in tandem to provide an engaging and responsive gaming experience, reflecting our business value of leveraging diverse technologies for a unified purpose.

Imagine the ticking clock - we are operating within a tight development timeline spanning two sprint timeframes from May 1st, 2023, to June 1st, 2023. This constraint not only defines our agility but also our ability to deliver quality within a compact timeframe, resonating with our business value of timeliness and efficiency.

Now, focus on our users. Initially, our game will cater to 1,000 registered users, with an anticipation of this number growing to 1,500 within six months of launch. This expected growth signifies our business value of scalability and sustainable growth.

Our game is designed for users aged 12 and above, respecting age-appropriate content and expecting our users to adhere to this restriction. This consideration reiterates our commitment to providing safe and age-suitable gaming content.

We assume consistent and reliable internet access for our users, a reflection of our aim to provide a seamless, real-time gaming experience.

Regular maintenance and updates post-launch are crucial, underscoring our commitment to continuous improvement and maximum performance - the heartbeat of our customer-centric approach.

Lastly, imagine a vibrant user community actively providing feedback and reporting issues. This critical interaction embodies our business value of engaging and listening to our user community to create a game that continually evolves and improves based on their input.

These assumptions and constraints provide a pragmatic lens to our project, aligning with our business value and forming the ground rules for the successful execution of our project.

## 9. Acceptance Criteria

The updated Roaming Kitty website should have a noticeable increase in user engagement and retention. This can be measured by examining the Wordpress server statistics. A negative scenario would be deploying the updated website and observing no noticeable change or even worse, a drop in the user's average time spent on the website, or a drop in the number of registered users.

The new website should foster social engagement in a way that feels natural. The game should allow users to connect and play with their friends, and should be playable from any platform.

The website may have trending news stories that increase the number of visitations and people playing the game. The game should function seamlessly under heavy load.

## 10. Risk and Mitigation

Site reliability is an important aspect of a successful deployment. We will achieve high reliability by eliminating risks such as:

- Inadequate performance on multiple devices and browsers
- Continually improving user engagement and retention
- Inadequate accessibility features for players with disabilities

Mitigation:

- Conduct thorough testing on various devices, platforms, and browsers to ensure compatibility and smooth gameplay.
- Regularly review user feedback, behavior, and preferences to optimize the game experience.
- Consult accessibility guidelines and standards, such as the Web Content Accessibility Guidelines (WCAG), to ensure the game is accessible to all users.

## 11. Summary

In this Product Requirement Document (PRD), we have outlined the development goals and objectives for our captivating online word search game. The focus is to create an immersive and accessible gaming experience that feels familiar to all users.

By offering various difficulty levels, daily rewards, and fostering community interaction, we aim to increase the popularity of the Roaming Kitty website. Aligned with our Objectives and Key Results (OKRs), we prioritize delivering a seamless user experience and ensuring inclusivity for all players.

## 10 .Reference

1. https://en.wikipedia.org/wiki/Word_search

2. https://roamingkitty.com

3. https://en.wikipedia.org/wiki/Product_requirements_document 

