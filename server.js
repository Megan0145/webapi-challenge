const express = require('express')
const cors = require('cors')
const projectsRouter = require('./projects/projectsRouter')
const actionsRouter = require('./actions/actionsRouter')
const server = express()

server.use(express.json())
server.use(cors())
server.use('/api/projects', projectsRouter)
server.use('/api/projects', actionsRouter)

server.get('/', (req, res) => {
    res.send('Welcome!')
})

module.exports = server;