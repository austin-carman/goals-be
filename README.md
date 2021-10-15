# Build Week Scaffolding for Node and PostgreSQL

## Video Tutorial

The following tutorial explains how to set up this project using PostgreSQL and Heroku.

[![Setting up PostgreSQL for Build Week](https://img.youtube.com/vi/kTO_tf4L23I/maxresdefault.jpg)](https://www.youtube.com/watch?v=kTO_tf4L23I)

## Requirements

- [PostgreSQL, pgAdmin 4](https://www.postgresql.org/download/) and [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed in your local machine.
- A Heroku app with the [Heroku PostgreSQL Addon](https://devcenter.heroku.com/articles/heroku-postgresql#provisioning-heroku-postgres) added to it.
- Development and testing databases created with [pgAdmin 4](https://www.pgadmin.org/docs/pgadmin4/4.29/database_dialog.html).

## Starting a New Project

- Create a new repository using this template, and clone it to your local.
- Create a `.env` file and follow the instructions inside `knexfile.js`.
- Fix the scripts inside `package.json` to use your Heroku app.

## Scripts

- **start**: Runs the app in production.
- **server**: Runs the app in development.
- **migrate**: Migrates the local development database to the latest.
- **rollback**: Rolls back migrations in the local development database.
- **seed**: Truncates all tables in the local development database, feel free to add more seed files.
- **test**: Runs tests.
- **deploy**: Deploys the main branch to Heroku.


## API Endpoint Documentation
### User Router
BaseURL: 
#### Login for existing user
[POST] /api/user/login
Parameter: none
Request body: 
  - Required: 
    - username (string)
    - password (string)
  - Example:
  {
    username: "John123",
    password: "password"
  }
Response: 
  - Example:
  {
    message: "Welcome back, John!",
    username: "John123",
    userId: 7,
    token: (token for authentication)
  }

#### Register new user
[POST] /api/user/register
Parameter: none
Request body: 
  - Required:
    - first_name (string)
    - last_name (string)
    - username: (string) - must be at least 3 characters in length
    - password: (string) - must be at least 3 characters in length
  - Example:
  {
    first_name: "John", 
    last_name: "Doe", 
    username: "John123", 
    password: "password"
  }
Response: 
  - Example:
  {
    "user_id": 6,
    "first_name": "John",
    "last_name": "Doe",
    "username": "John123"
  }

### Goals
#### Get all goals for specified user
[GET] /api/goals/:user_id
Parameter: user_id
Request body: none
Response:
  - Example:
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

#### Create new goal, with or without steps, for specified user
[POST] /api/goals/new-goal/:user_id
Parameter: user_id
Request body: 
  - Required: 
    - goal_title (string)

  - Optional:
    - steps (array of step objects) - Becomes required IF steps are created with goal.
    - step_title (string) - Becomes required IF steps are created with goal. Required in each step object in steps list.
    - step_notes (string) - An optional property of each step object
    - step_completed (boolean) - An optional property of each step object. Defaults to false if not provided.

  - Example 1 - new goal without steps:
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

Response: 
  - Example 1 - created with no steps.
  {
    "goal_id": 4,
    "user_id": 1,
    "goal_title": "New Goal Title",
    "goal_completed": false,
    "steps": null
  }

Response: 
  - Example 2: created with steps
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

#### Edit specified goal and/or it's associated steps
[PUT] /api/goals/edit/:goal_id
Parameter: goal_id
Request body:
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

  - Example #2 - Edits only to goal properties (goal_title, goal_completed):
  {
    "goal_id": 1,
    "user_id": 1,
    "goal_title": "Read 12 books this year",
    "goal_completed": false,
  }

  - Example #3 - Edited only step properties (step_title, step_notes, step_completed):
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


Response: 
  - response body will contain properties that are being edited. 
    - if only goal properties are edited (ie: goal_title, goal_completed) then only goal properties will be in response body (pre-existing steps will not be in response body)
    - if only step properties are edited (ie: step_title, step_notes, step_completed) then only step properties will be in response body. 

  - Example #1 - edits made to goal and steps:
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

  - Example #2 - Edited only goal properties (goal_title, goal_completed):
  {
    "goal_id": 1,
    "user_id": 1,
    "goal_title": "Read 12 books this year",
    "goal_completed": false,
  }

  - Example #3 - Edited only step properties (step_title, step_notes, step_completed):
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

#### Delete specified goal and all associated steps
[DELETE] /delete-goal/:goal_id
Parameter: goal_id
Request body: none
Response: Number of deleted goals
  - Example - 1 Goal deleted (and all associated steps):
    - 1

#### Delete specified step
[DELETE] /delete-step/:step_id
Parameter: step_id
Request body: none
Response: Number of deleted steps
  - Example: 1 step deleted:
    - 1



**The following scripts NEED TO BE EDITED before using: replace `YOUR_HEROKU_APP_NAME`**

- **migrateh**: Migrates the Heroku database to the latest.
- **rollbackh**: Rolls back migrations in the Heroku database.
- **databaseh**: Interact with the Heroku database from the command line using psql.
- **seedh**: Runs all seeds in the Heroku database.

## Hot Tips

- Figure out the connection to the database and deployment before writing any code.

- If you need to make changes to a migration file that has already been released to Heroku, follow this sequence:

  1. Roll back migrations in the Heroku database
  2. Deploy the latest code to Heroku
  3. Migrate the Heroku database to the latest

- If your frontend devs are clear on the shape of the data they need, you can quickly build provisional endpoints that return mock data. They shouldn't have to wait for you to build the entire backend.

- Keep your endpoints super lean: the bulk of the code belongs inside models and other middlewares.

- Validating and sanitizing client data using a library is much less work than doing it manually.

- Revealing crash messages to clients is a security risk, but during development it's helpful if your frontend devs are able to tell you what crashed.

- PostgreSQL comes with [fantastic built-in functions](https://hashrocket.com/blog/posts/faster-json-generation-with-postgresql) for hammering rows into whatever JSON shape.

- If you want to edit a migration that has already been released but don't want to lose all the data, make a new migration instead. This is a more realistic flow for production apps: prod databases are never migrated down. We can migrate Heroku down freely only because there's no valuable data from customers in it. In this sense, Heroku is acting more like a staging environment than production.

- If your fronted devs are interested in running the API locally, help them set up PostgreSQL & pgAdmin in their machines, and teach them how to run migrations in their local. This empowers them to (1) help you troubleshoot bugs, (2) obtain the latest code by simply doing `git pull` and (3) work with their own data, without it being wiped every time you roll back the Heroku db. Collaboration is more fun and direct, and you don't need to deploy as often.
