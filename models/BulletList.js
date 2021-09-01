// const Bullet = require("./Bullet")
const Entity = require('./Entity')
class Bullet extends Entity {
    constructor(angle) {
        super()

        this.id = Math.random()
        this.spdX = Math.cos(angle / 180 * Math.PI) * 10
        this.spdY = Math.sin(angle / 180 * Math.PI) * 10

        this.timer = 0
        this.toRemove = false

        BULLET_LIST.list[this.id] = this
    }

    superUpdate = Entity.update
    update() {
        if (this.timer++ > 100) {
            this.toRemove = true
        }
        this.superUpdate()
    }
}
class BulletList {
    constructor() {
        this.list = {}
    }

    update() {
        if (Math.random() < 0.1) {
            new Bullet(Math.random() * 360)
        }
        const positions = []
        for (const i in this.list) {
            const bullet = this.list[i]
            bullet.update()
            // save position of each bullet to the list 
            positions.push({
                x: bullet.x,
                y: bullet.y,
            })
        }
        return positions
    }

}
const BULLET_LIST = new BulletList()
module.exports = BULLET_LIST