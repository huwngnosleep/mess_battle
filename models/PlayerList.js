class PlayerList {
    constructor() {
        this.list = {}
    }

    update() {
        const positions = []
        for (const i in this.list) {
            const player = this.list[i]
            player.update()
            // save position of each player to the list 
            positions.push({
                x: player.x,
                y: player.y,
                name: player.name,
            })
        }
        return positions
    }

}

module.exports = new PlayerList()