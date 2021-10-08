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

## TODO NOTES:
- creating a new step: right now step_title is required. What if the user wants to create a new goal without creating any steps for it? Maybe change step_title to not_nullable?
- Consider adding time created for a new goal/steps
- Find a better way to structure the return for get user goals(goals-model)

## API Endpoint Documentation

### User
#### Login for existing user.
[POST] /api/user/login
Parameter: none
Request body: 
  {
    username: "sting", 
    password: "sting"
  }
  - Required: all
Response: 
  {
    message: Welcome back (user's first name)!,
    username: (user's username),
    userId: (user's user_id),
    token: (token for authentication)
  }

#### Register for new user.
[POST] /api/user/register
Parameter: none
Request body: 
  {
    first_name: "string", 
    last_name: "string:, 
    username: "string", 
    password: "string"
  }
  - Required: all
Response: 
  {
    "user_id": 3,
    "first_name": "John",
    "last_name": "Doe",
    "username": "JD"
  }

### Goals
#### Get goals for specific user
[GET] /api/goals/:user_id
Parameter: user_id
Request body: none
Response: 
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
  },
]

#### Create new goal for specified user
[POST] /api/goals/new-goal/:user_id
Parameter: user_id
Request body: 
{
    "user_id": integer,
    "goal_title": "string",
    "steps": [
        {
            "step_title": "string",
            "step_notes": "string"
        }
    ]
    
}
  - Required: user_id, goal_title, step_title (required for each step object in list)
  - Optional: step_notes. May include list of step objects.
Response: 
{
    "goal_id": 4,
    "user_id": 1,
    "goal_title": "My new Goal",
    "goal_completed": false,
    "steps": {
        "step_id": 4,
        "goal_id": 4,
        "step_title": "Step #1",
        "step_notes": "This is your first step",
        "step_completed": false
    }
}
  - goal_completed, step_completed are false by default. Can be updated to true in edit goal endpoint.

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
