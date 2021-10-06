const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
// const db = require('./data/db-config') // don't need this in server

// function getAllUsers() { return db('users') } // don't need this in server

// don't need this in server
// async function insertUser(user) {
//   // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
//   // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
//   // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
//   const [newUserObject] = await db('users').insert(user, ['user_id', 'username', 'password'])
//   return newUserObject // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
// }

// Routers go here

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

// Routes' base URL will go here

server.get("/", (req, res) => {
  res.status(200).json("api up")
})

server.get('*', (req, res) => {
  res.status(404).json({
    message: "not found"
  })
})

// Error Handler
server.use((err, req, res, next) => {
  res.json({
    status: 500,
    message: err.message,
    error: err.stack
  })
})

// don't need in server
// server.get('/api/users', async (req, res) => {
//   res.json(await getAllUsers())
// })

// don't need in server
// server.post('/api/users', async (req, res) => {
//   res.status(201).json(await insertUser(req.body))
// })

module.exports = server
