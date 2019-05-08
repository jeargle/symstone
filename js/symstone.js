let score, game

score = 0

class BootScene extends Phaser.Scene {
    constructor() {
        super('boot')
    }

    init(config) {
        console.log('[BOOT] init', config)
    }

    preload() {
        console.log('[BOOT] preload')
    }

    create() {
        'use strict'

        game.scene.start('load')
        game.scene.remove('boot')
    }

    update() {
        console.log('[BOOT] update')
    }
}

class LoadScene extends Phaser.Scene {
    constructor() {
        super('load')
    }

    init(config) {
        console.log('[LOAD] init', config)
    }

    preload() {
        'use strict'

        this.add.text(80, 160, 'loading...',
                      {font: '30px Courier',
                       fill: '#ffffff'})

        // Load images

        // Load sound effects
    }

    create() {
        'use strict'
        game.scene.start('title')
        game.scene.remove('load')
    }

    update() {
        console.log('[LOAD] update')
    }
}

class TitleScene extends Phaser.Scene {
    constructor() {
        super('title')
    }

    init(config) {
        console.log('[TITLE] init', config)
    }

    preload() {
        console.log('[TITLE] preload')
    }

    create() {
        'use strict'

        this.add.text(80, 160, 'SYMSTONE',
                      {font: '50px Courier',
                       fill: '#ffffff'})
        this.add.text(80, 240, 'press "W" to start',
                      {font: '30px Courier',
                       fill: '#ffffff'})

        this.input.keyboard.on('keydown_W', this.start, this)
    }

    update() {
        console.log('[TITLE] update')
    }

    start() {
        'use strict'
        console.log('[TITLE] start')
        game.scene.switch('title', 'play')
    }
}

class PlayScene extends Phaser.Scene {
    constructor() {
        super('play')
    }

    create() {
        'use strict'

        // this.keyboard = game.input.keyboard

        // Controls

        this.input.keyboard.on('keydown_E', this.end, this)
    }

    update() {
        'use strict'
        console.log('[PLAY] update')
    }

    end() {
        'use strict'
        console.log('[PLAY] end')
        game.scene.switch('play', 'end')
    }
}

class EndScene extends Phaser.Scene {
    constructor() {
        super('end')
    }

    create() {
        'use strict'

        this.add.text(600, 10, 'Score: ' + score,
                      {font: '30px Courier',
                       fill: '#ffffff'})
        this.add.text(80, 160, 'YOU WIN',
                      {font: '50px Courier',
                       fill: '#ffffff'})
        this.add.text(80, 240, 'press "W" to restart',
                      {font: '30px Courier',
                       fill: '#ffffff'})

        this.input.keyboard.on('keydown_W', this.restart, this)
    }

    update() {
        'use strict'
        console.log('[END] update')
    }

    restart() {
        'use strict'
        console.log('[END] restart')
        game.scene.switch('end', 'title')
    }
}


const gameConfig = {
    type: Phaser.CANVAS,
    parent: 'game-div',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                y: 600
            },
            height: 775,
            width: 1600,
            x: 0,
            y: -200
        }
    },
    scene: [
        BootScene,
        LoadScene,
        TitleScene,
        PlayScene,
        EndScene
    ]
}

game = new Phaser.Game(gameConfig)
game.scene.start('boot', { someData: '...arbitrary data' })
