const express = require('express')
const socket = require('./socket')
const app = express()
const server = require('http').Server(app)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html')
})

app.use('/client', express.static(__dirname + '/client'))

server.listen(2000)
console.log('server started')

const players = {}

const io = require('socket.io')(server)
io.sockets.on('connection', (player) => {
    player.id = Math.random()
    player.x = 0
    player.y = 0
    // get a random name for each player from 1 to 10
    player.name = "" + Math.floor(10 * Math.random())
    players[player.id] = player
    player.on('disconnect', () => {
        delete players[player.id]
    })

})

setInterval(() => {
    // position of all players
    const positions = []
    for (const i in players) {
        const player = players[i]
        player.x++
        player.y++
        // save position of each player to the list 
        positions.push({
            x: player.x,
            y: player.y,
            name: player.name,
        })
    }
    for (const i in players) {
        players[i].emit('newPositions', positions)
    }
}, 1000 / 25);