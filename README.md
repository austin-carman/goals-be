# Goal Tracker (backend repo)

The motivation behind this project is 3 fold:
1. `Practice`, practice, practice.
2. Seek `advice` to improve my coding skills and meeting best coding practices. I want to learn from you!
4. Learn about possible `job opportunities`. I am actively seeking job opportunities and if you are aware of any I would love to hear from you!

How you can contact me or leave feedback:
  - Connect with and/or message me via [LinkedIn](https://www.linkedin.com/in/austin-carman/).
  - [Github](https://github.com/austin-carman/goals-be): You can submit an issue, pull request, or leave a comment in the discussion.
  
Feel free to checkout other repos pinned on my [Github profile](https://github.com/austin-carman/)!

## Overview

This backend application follows RESTful API to handle user authentication and CRUD operations so users can easily track progress with each goal. 
After creating an account, users can login and view all their goals which are organized into 3 categories: all, completed, and in progress. Users can create, edit, or delete a goal with steps, notes, and completion status.

View the [live site](https://goals-fe.vercel.app/).

You can sign up to create your own login information or use the test user login:  
username: _test-user@test.com_  
password: _1234_

View the [frontend repo](https://github.com/austin-carman/goals-fe) on Github.

## Running the project

From the repo:
  1. Clone this project locally
  2. `cd` into project directory
  2. Run `npm install` to install dependencies
  3. Run `npm start` to start server

## Dependency List

- [Node](https://nodejs.org/en)
- [Express](https://expressjs.com/)
- [knex](https://knexjs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)


## Environment Variables

```
PORT=
NODE_ENV=
DEV_DATABASE_URL=
TESTING_DATABASE_URL=
JWT_SECRET=
```

## API Endpoint Documentation
### User Router
BaseURL: https://goalmanager.herokuapp.com/api/
#### Login for existing user
[POST] BaseURL/user/login
- Parameter: none
- Request body: 
  - Required: 
    - username (string)
    - password (string)
  - Example:
    ```
    {
    username: "John123",
    password: "password"
    }
    ```
- Response: 
  - Example:
    ```
    {
    message: "Welcome back, John!",
    username: "John123",
    userId: 7,
    token: (token for authentication)
    }
    ```

#### Register new user
[POST] BaseURL/user/register
- Parameter: none
- Request body: 
  - Required:
    - first_name (string)
    - last_name (string)
    - username: (string) - must be at least 3 characters in length
    - password: (string) - must be at least 3 characters in length
  - Example:
  ```
  {
    first_name: "John", 
    last_name: "Doe", 
    username: "John123", 
    password: "password"
  }
  ```
- Response: 
  - Example:
  ```
  {
    "user_id": 6,
    "first_name": "John",
    "last_name": "Doe",
    "username": "John123"
  }
  ```

### Goals
#### Get all goals for specified user
[GET] BaseURL/goals/:user_id
- Parameter: user_id
- Request body: none
- Response:
  - Example:
  ```
  [
    {
      "goal_id": 1,
      "user_id": 1,
      "goal_title": "Read 12 books this year",
      "goal_completed": false,
      "steps": [
        {
          "step_id": 1,
          "step_title": "Pick 12 books to read",
          "step_notes": null,
          "step_completed": true,
          "goal_id": 1
        },
        {
          "step_id": 2,
          "step_title": "Read 1 book this month",
          "step_notes": "Read 30 minutes/day",
          "step_completed": false,
          "goal_id": 1
        }
      ]
    },
    {
      "goal_id": 2,
      "user_id": 1,
      "goal_title": "Save $1000",
      "goal_completed": false,
      "steps": [
        {
          "step_id": 3,
          "step_title": "Create a budget",
          "step_notes": null,
          "step_completed": false,
          "goal_id": 2
        }
      ]
    }
  ]
  ```

#### Create new goal, with or without steps, for specified user
[POST] BaseURL/goals/new-goal/:user_id
- Parameter: user_id
- Request body: 
  - Required: 
    - goal_title (string)

  - Optional:
    - steps (array of step objects) - Becomes required IF steps are created with goal.
    - step_title (string) - Becomes required IF steps are created with goal. Required in each step object in steps list.
    - step_notes (string) - An optional property of each step object
    - step_completed (boolean) - An optional property of each step object. Defaults to false if not provided.

  - Example 1 - new goal without steps:
  ```
  {
    "goal_title": "New Goal Title"    
  }

  - Example 2 - new goal with steps:
  {
    "goal_title": "New Goal Title",
    "steps": [
      {
        "step_title": "Step #1 Title",
        "step_completed": true
      },
      {
        "step_title": "Step #2 Title",
        "step_notes": "Step notes"
      }
    ]
  }
  ```

- Response: 
  - Example 1 - created with no steps.
  ```
  {
    "goal_id": 4,
    "user_id": 1,
    "goal_title": "New Goal Title",
    "goal_completed": false,
    "steps": null
  }
  ```
  - Example 2: created with steps
  ```
  {
    "goal_id": 4,
    "user_id": 1,
    "goal_title": "New Goal Title",
    "goal_completed": false,
    "steps": [
      {
        "step_id": 2,
        "goal_id": 4,
        "step_title": "Step #1 Title",
        "step_notes": null
        "step_completed": true
      },
      {
        "step_id": 3,
        "goal_id": 4,
        "step_title": "Step #2 Title",
        "step_notes": "Step notes",
        "step_completed: false
      }
    ]
  }
  ```

#### Edit specified goal and/or it's associated steps
[PUT] BaseURl/goals/edit/:goal_id
- Parameter: goal_id
- Request body:
  - Required:
    - if editing goal properties (i.e. goal_title, goal_completed):
      - goal_id (integer) plus editable goal properties
    - if editing step properties (i.e. step_title, step_notes, step_completed):
      - steps (array of step objects) - Each step being edited must be included as a step object in the steps array.
      - step_id (integer) - Required property in each step objects for steps being edited. Also must include editable properties in step object.
    - any goal and/or step properties that are being edited

  - Optional:
    - goal_title (string)
    - goal_completed (boolean)
    - steps (array of step objects that are edited) - Becomes required IF editing any step object properties, along with step_id for each edited step object.
    - step_title (string)
    - step_notes (string)
    - step_completed (boolean)

  - Example #1 - edits made to goal and steps:
  ```
  {
    "goal_id": 1,
    "user_id": 1,
    "goal_title": "Read 12 books this year",
    "goal_completed": false,
    "steps": [
      {
        "step_id": 1,
        "step_title": "Pick 12 books to read",
        "step_notes": null,
        "step_completed": true,
        "goal_id": 1
      },
      {
        "step_id": 2,
        "step_title": "Read 1 book this month",
        "step_notes": "Read 30 minutes/day",
        "step_completed": false,
        "goal_id": 1
      }
    ]
  }
  ```

  - Example #2 - Edits only to goal properties (goal_title, goal_completed):
  ```
  {
    "goal_id": 1,
    "user_id": 1,
    "goal_title": "Read 12 books this year",
    "goal_completed": false,
  }
  ```

  - Example #3 - Edited only step properties (step_title, step_notes, step_completed):
  ```
  {
    "steps": [
      {
        "step_id": 1,
        "step_title": "Pick 12 books to read",
        "step_notes": null,
        "step_completed": true,
        "goal_id": 1
      },
      {
        "step_id": 2,
        "step_title": "Read 1 book this month",
        "step_notes": "Read 30 minutes/day",
        "step_completed": false,
        "goal_id": 1
      }
    ]
  }
  ```

- Response: 
  - response body will contain properties that are being edited. 
    - if only goal properties are edited (ie: goal_title, goal_completed) then only goal properties will be in response body (pre-existing steps will not be in response body)
    - if only step properties are edited (ie: step_title, step_notes, step_completed) then only step properties will be in response body. 

  - Example #1 - edits made to goal and steps:
  ```
  {
    "goal_id": 1,
    "user_id": 1,
    "goal_title": "Read 12 books this year",
    "goal_completed": false,
    "steps": [
      {
        "step_id": 1,
        "step_title": "Pick 12 books to read",
        "step_notes": null,
        "step_completed": true,
        "goal_id": 1
      },
      {
        "step_id": 2,
        "step_title": "Read 1 book this month",
        "step_notes": "Read 30 minutes/day",
        "step_completed": false,
        "goal_id": 1
      }
    ]
  }
  ```

  - Example #2 - Edited only goal properties (goal_title, goal_completed):
  ```
  {
    "goal_id": 1,
    "user_id": 1,
    "goal_title": "Read 12 books this year",
    "goal_completed": false,
  }
  ```

  - Example #3 - Edited only step properties (step_title, step_notes, step_completed):
  ```
  {
    "steps": [
      {
        "step_id": 1,
        "step_title": "Pick 12 books to read",
        "step_notes": null,
        "step_completed": true,
        "goal_id": 1
      },
      {
        "step_id": 2,
        "step_title": "Read 1 book this month",
        "step_notes": "Read 30 minutes/day",
        "step_completed": false,
        "goal_id": 1
      }
    ]
  }
  ```

#### Delete specified goal and all associated steps
[DELETE] BaseURL/goals/delete-goal/:goal_id
- Parameter: goal_id
- Request body: none
- Response: Number of deleted goals
  - Example - One Goal deleted (and all associated steps):
    - 1

#### Delete specified step
[DELETE] BaseURL/goals/delete-step/:step_id
- Parameter: step_id
- Request body: none
- Response: Number of deleted steps
  - Example: One step deleted:
    - 1

