class Entity {
    static PLAYER_LIST = {}
    static BULLET_LIST = {}

    constructor(id) {
        this.x = 250
        this.y = 250
        this.id = id
        this.spdX = 0
        this.spdY = 0

    }

    static update() {
        this.updatePosition()
    }

    updatePosition() {
        this.x += this.spdX
        this.y += this.spdY
    }
}

module.exports = Entity