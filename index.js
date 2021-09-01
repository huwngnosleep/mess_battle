const express = require('express')
const app = express()
const server = require('http').Server(app)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html')
})

app.use('/client', express.static(__dirname + '/client'))
let DEBUG = true
server.listen(3000)
console.log('server started')

const SOCKET_LIST = {}
const PLAYER_LIST = require('./models/PlayerList')
const BULLET_LIST = require('./models/BulletList')
const Player = require('./models/Player')


const io = require('socket.io')(server)
io.sockets.on('connection', (socket) => {
    socket.id = Math.random()
    SOCKET_LIST[socket.id] = socket

    const player = new Player(socket.id)
    PLAYER_LIST.list[socket.id] = player
    player.onConnect(socket)

    socket.on('disconnect', () => {
        delete SOCKET_LIST[socket.id]
        player.onDisconnect(socket)
    })

    socket.on('sendMsgToServer', (data) => {
        const playerName = ("" + socket.id).slice(2, 7)
        for (const i in SOCKET_LIST) {
            SOCKET_LIST[i].emit('addToChat', playerName + ': ' + data)
        }
    })

    socket.on('evalServer', (data) => {
        if (!DEBUG) {
            return
        }

        const response = eval(data)
        socket.emit('evalAnswer', response)
    })
})

setInterval(() => {
    const positions = {
        players: PLAYER_LIST.update(),
        bullets: BULLET_LIST.update(),
    }

    for (const i in SOCKET_LIST) {
        SOCKET_LIST[i].emit('newPositions', positions)
    }
}, 1000 / 25);