const Bullet = require("./Bullet")

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
module.exports = new BulletList()