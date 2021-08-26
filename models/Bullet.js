const BulletList = require("./BulletList");
const Entity = require("./Entity");

class Bullet extends Entity {
    constructor(angle) {
        super()

        this.id = Math.random()
        this.spdX = Math.cos(angle / 180 * Math.PI) * 10
        this.spdY = Math.sin(angle / 180 * Math.PI) * 10

        this.timer = 0
        this.toRemove = false

        // something strange happened here so i assign BulletList[id] instead of BulletList.list[]
        BulletList.list[this.id] = this
    }

    superUpdate = Entity.update
    update() {
        if (this.timer++ > 100) {
            this.toRemove = true
        }
        this.superUpdate()
    }
}

module.exports = Bullet