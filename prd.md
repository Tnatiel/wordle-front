# Final Project

Product Requirement Document (PRD)

* [Overview](#overview)
    + [Wordle Game](#wordle-game)
* [Requirements](#requirements)
* [Features/User Stories](#features-user-stories)
    + [The Form](#the-form)
    + [Interactions](#interactions)
    + [Reactify](#reactify)
    + [Layout](#layout)
    + [Game Logic On Single Line](#game-logic-on-single-line)
    + [UI Testing](#ui-testing)
    + [Full Front End Game Logic](#full-front-end-game-logic)
    + [Users](#users)

## Overview

This document describes a “Wordle” game development in order to participate in a full cycle of web development.

The project was structured to support and guide our web development study path.

### Wordle Game

Wordle is a Bull & Cows style word game. The user is required to guess a randomly selected word in N turns. The
application gets each guess as input and provides clues for the next guess.

An example to a “Wordle” game:

* [Hebrew version - Haaretz](https://www.haaretz.co.il/riddles/ty-page/haaretz-wordle)
* [English version - NYT](https://www.nytimes.com/games/wordle/index.html)

## Requirements

Till another decision - Typescript and javascript are allowed.

    We use user stories to describe our application requirements. Each user story contains a list of tasks required to complete it.
    There are several ways to write user stories. I chose a template that describes the product from the point of view of a user who tries to use the application.

| Requirement                                                           | Category          | Target            |
|-----------------------------------------------------------------------|-------------------|-------------------|
| Milestone A                                                           |                   |                   | 
| [Navigating to the page will display a static wordle game](#the-form) | npm, HTML, CSS    | :computer:        | 
| [The user should be able to enter a word](#interactions)              | HTML, CSS, JS     | :computer:        | 
| [The user should not notify we changed the implementation](#reactify) | Static React      | :computer: :herb: |                                                          
| Milestone B                                                           |                   |                   | 
| [User should start with welcome and have some help](#layout)          | Routing, Modal    | :computer: :herb: | 
| [User can play](#full-front-end-game-logic)                           | State             | :computer: :herb: | 
| [Let me connect](#users)                                              | Forms and storage | :computer: :herb: | 
| Milestone C                                                           |                   |                   |
| [Let the server choose the word](#simple-backend)                     | Express           | :factory: :herb:  |
| [The word should not be available to the client](#advanced-game)      | Express           | :factory: :herb:  |

* :computer: Client Side
* :herb: React
* :factory: Server Side

## Features/User Stories

### The Form

Navigating to the page will display a static “Wordle” game.

* [x] Prepare your development environment
* [x] Implement game HTML page (see example below)
* [x] Add style to the page (choose your own)

![Mock ](assets/wordle-mock.png)

### Interactions

* [x] After page loaded, the focus should be at the first input
* [x] Allow user to enter single letter:
    - Only letters
    - Move focus to the next input in the same row
    - After the last letter of each line print "done" to the console

### Reactify

* [x] Split the page into components
* [x] Refactor the page into static React components
    - Consider use the React [tools](https://beta.reactjs.org/learn/start-a-new-react-project)
    - Provide "start" script to run the project (`npm start` to run your project)

### Layout

* [x] Welcome screen
    * First navigating to the game will the display the welcome
    * The screen should contain the text "Welcome user!"
    * You should choose how to style this page (animation, video, just text)
* [x] Topb
    * Should contain header/name and a link/button to display the help screen
* [x] Help screen
    * Should be [modal popup](https://en.wikipedia.org/wiki/Modal_window)
    * Should close only by clicking X at the top corner or clicking "ESC" in the keyboard
    * You should choose how to explain the game

#### Layout Examples

Welcome Screen

![Welcome Screen](./assets/wordle-mock-welcome.png)

Top Bar

![Top Bar](./assets/wordle-mock-topbar.png)

### Game Logic On Single Line

* [x] Choose word (static)
* [x] Starting at the first line
* [x] After the last letter check the input against the select word and mark the inputs
    * Bull => green background
    * Cow => yellow background
* [x] Mark all guessed letters in the virtual keyboard
* [x] If all letters are Bull display dialog "success"

### Full Front End Game Logic

* [x] For all lines
    * [x] After finish line logic, put the focus on the first character of the next line
    * [x] Do single line logic
* [x] If no success, display dialog "fail"

### Users

* [x] login link/button at the topbar
    * [x] Show modal with login form (name) and login button that close the modal
    * [x] Keep the username locally (browser)
* [x] Change the welcome screen to greet the user by his name if any, else use "guest"
* [x] After login, the topbar should contain the username and a logout link/button
* [x] The logout link/button should delete username locally

### Simple Backend

* [x] when game starts, fetch the word for the game from the server
* [x] move the check word mechanism to the server

### Advanced Game

* [x] don't send the real word in the network
* [ ] any testable code should have tests (client & server)
* [x] the code should be in TypeScript
* [ ] the code should be clean (should pass linter and formatter)

### UI Testing

TBD

---

:globe_with_meridians:


---

<!--
### Playground with assets for this document

<img src="docs/wordle-logo.svg" width="800" height="400" alt="Logo">

<img src="https://github.com/grunitech/final-project/blob/main/docs/wordle-mock-welcome.png" width="30">

<img src="https://github.com/grunitech/final-project/blob/main/docs/wordle-mock-welcome.png" style="width: 100px">
-->