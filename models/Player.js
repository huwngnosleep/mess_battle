const Entity = require('./Entity')
const PlayerList = require('./PlayerList')

class Player extends Entity {
    constructor(id) {
        super()
        this.id = id
        this.name = "" + Math.floor(10 * Math.random())

        // keyboard interactivity
        this.pressingRight = false
        this.pressingLeft = false
        this.pressingUp = false
        this.pressingDown = false
        this.maxSpd = 10

        PlayerList.list[id] = this
    }

    superUpdate = Entity.update

    update() {
        this.updateSpd()
        this.superUpdate()
    }

    updateSpd() {
        if (this.pressingRight) {
            this.spdX = this.maxSpd
        } else if (this.pressingLeft) {
            this.spdX = -this.maxSpd
        } else {
            this.spdX = 0
        }

        if (this.pressingUp) {
            this.spdY = -this.maxSpd
        } else if (this.pressingDown) {
            this.spdY = this.maxSpd
        } else {
            this.spdY = 0
        }
    }

    onConnect(socket) {
        socket.on('keyPress', (data) => {
            switch (data.inputId) {
                case 'right':
                    this.pressingRight = data.state
                    break;
                case 'down':
                    this.pressingDown = data.state
                    break;
                case 'left':
                    this.pressingLeft = data.state
                    break;
                case 'up':
                    this.pressingUp = data.state
                    break;

                default:
                    break;
            }
        })
    }

    onDisconnect(socket) {
        delete PlayerList.list[socket.id]
    }
}

module.exports = Player