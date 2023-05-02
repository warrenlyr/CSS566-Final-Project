# Product Requirements Document

## Table of Contents (update 5/1/2023)

- [Overview](#Overview)
- [Introduction](#Introduction)
- [Goals and Objectives](#Goals-and-Objectives)
- [User Stories](#User-Stories)
- [Features](#Features)
- [Functional Requirements](#Functional-Requirements)
- [Non-Functional Requirements](#Non-Functional-Requirements)
- [Assumptions and Constraints](#Assumptions-and-Constraints)
- [Acceptance Criteria](#Acceptance-Criteria)
- [Reference](#Reference)

## Overview

CSS 566 Software Management

Spring 2023, University of Washington Bothell

Team: Purple Kitty Squad

Stakeholders:

- Barack Liu (Product Owner)
- Warren Liu (Lead Developer/Architecture)
- Haihan Jiang (QA Engineer)
- Shahruz Mannan (Sprint 1 Scrum Master)
- Amalaye Oyake (Sprint 2 Scrum Master)
- Arsheya Raj (Designer)

This project aims to create a simple Word Search game using the Scrum management framework.

## Introduction

This Product Requirement Document (PRD) outlines the specifications for an online word search game. Word search games, also known as word find, word seek, word sleuth, or mystery word puzzles, engage players in identifying words hidden within a grid of letters. This PRD seeks to detail the product's purpose, objectives, user stories, features, functional and non-functional requirements, assumptions, constraints, and acceptance criteria.

## Goals and Objectives

Our primary goal is to provide an immersive and enjoyable word search gaming experience accessible to a diverse range of players. We aim to increase user engagement, measured by the time spent on the platform and the frequency of return visits.

Specific objectives include:

1. Enhancing user engagement by offering varying levels of difficulty.
2. Incentivizing regular gameplay through daily rewards and power-ups.
3. Encouraging community interaction by allowing players to create and share their own puzzles.

## User Stories

1. As a player, I want to play the word search game online so that I can enjoy a fun and engaging experience from anywhere. For example, a play can play the game from the browser on a desktop, tablet, or mobile device.
2. As a player, I want to view my final score and see where I rank in the historical scores after the game, so I can track my improvement over time. For example, the top 100 historical scores from all players are available. If my score is inside the top 100, I can see my exact ranking. If not, I will be notified that my ranking is outside of the top 100.
3. As a player, I want to share my own words in the word search game and share them in the game repository, so other players can play the game using these words. For example, a player can provide 3 custom words, like, University, Washington, and Bothell, and choose the level of the game, then a word search game will be automatically generated. 
4. As a player, I want to submit my scores anonymously, so I can maintain privacy while enjoying the game. For example, if a player doesn't log in or I choose to submit my scores anonymously, the username under my score will be “Anonymous user”.
5. As a player, when I log in, I can see all my historical scores.
6. As a player, if I log in daily, I will get credits and it will show in my profile.

## Features

1. Log in/log out: The players can register and log in to keep all their score history.
2. Fixed Tries: The game should limit the number of flip attempts in each game to increase the challenge.
3. Daily Rewards: Regular site visitation should offer rewards and boosts to incentivize return visits.
4. Custom Word Search: Players should be able to input words to generate a custom word search game.
5. Level choice: The player should be able to choose levels of difficulty.
6. Anonymous score submission: If the player doesn’t log in, or they choose to submit scores anonymously when logging in, their scores won’t show the player’s username in the historical score ranking.

## Functional Requirements

1. Difficulty Levels: The game should offer various difficulty levels, such as 3x3, 6x6, and 9x9 grids. 
2. Word Goals: The player should aim to find five words in each grid.
3. Device Compatibility: The game should adapt to different devices, including desktops and mobile devices.
4. Power-Ups: The game should include power-ups and bonuses to increase player engagement.
5. Log-in system: The game supports registering and login.
6. Grading record: The game can record the top 100 grades history for all players, and all grades’ history for each login player.

## Non-Functional Requirements

1. Security: The game should be suitable for people over 12 years of age. The player needed to check an agreement box to ensure they were over 12 years of age before they play the game.
2. Performance: The game should run in real-time on modern browsers using Javascript, without lags.
3. Accessibility: The game provides accessible features for players who have difficulty in vision or other disabilities which prevent them from fully enjoying the game. 
4. Cross-platform: The game should be accessible on a variety of platforms, including PCs, phones, and tablets.
5. Scalability: The game should be able to handle 1,000 users at a given point in time.
6. User-friendly: The user experience for this game should be friendly even for first-time players.

## Assumptions and Constraints

1. Resource Allocation: The project team includes six members, with each individual contributing 6 hours per week.
2. Budget: The project budget is $60.
3. Technology: The software will be developed using JavaScript, Python, and HTML.

## Acceptance Criteria

1. Scalability: The game should be able to handle user counts of 1,000 at the same time.
2. Browser Compatibility: The game should function correctly on Safari and Chrome, across Mac, Windows, Android, and iOS.
3. Network Adaptability: The game should maintain smooth playability even when players' network speed is suboptimal.

## Reference

1. https://en.wikipedia.org/wiki/Word_search

2. https://roamingkitty.com

3. https://en.wikipedia.org/wiki/Product_requirements_document 

