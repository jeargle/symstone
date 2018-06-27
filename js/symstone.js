var score, bootScene, loadScene, titleScene, playScene, endScene, game;

score = 0;

bootScene = {
    key: 'boot',
    active: true,
    init: (config) => {
        console.log('[BOOT] init', config);
    },
    preload: () => {
        console.log('[BOOT] preload');
    },
    create: function() {
        'use strict';

        game.scene.start('load');
        game.scene.remove('boot');
    },
    update: () => {
        console.log('[BOOT] update');
    }
};

loadScene = {
    key: 'load',
    // active: true,
    renderToTexture: true,
    x: 64,
    y: 64,
    width: 320,
    height: 200,
    init: (config) => {
        console.log('[LOAD] init', config);
    },
    preload: function() {
        'use strict';
        var loadLbl;

        loadLbl = this.add.text(80, 160, 'loading...',
                                {font: '30px Courier',
                                 fill: '#ffffff'});

        // Load images

        // Load sound effects
    },
    create: function() {
        'use strict';
        game.scene.start('title');
        game.scene.remove('load');
    },
    update: () => {
        console.log('[LOAD] update');
    }
};

titleScene = {
    key: 'title',
    init: (config) => {
        console.log('[TITLE] init', config);
    },
    preload: () => {
        console.log('[TITLE] preload');
    },
    create: function() {
        'use strict';
        var nameLbl, startLbl;

        nameLbl = this.add.text(80, 160, 'SYMSTONE',
                                {font: '50px Courier',
                                 fill: '#ffffff'});
        startLbl = this.add.text(80, 240, 'press "W" to start',
                                 {font: '30px Courier',
                                  fill: '#ffffff'});

        // wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        // wKey.onDown.addOnce(this.start, this);
        this.input.keyboard.on('keydown_W', this.start, this);
    },
    update: () => {
        console.log('[TITLE] update');
    },
    extend: {
        start: function() {
            'use strict';
            game.scene.start('play');
            game.scene.remove('title');
        }
    }
};

playScene = {
    key: 'play',
    create: function() {
        'use strict';

        // this.keyboard = game.input.keyboard;

        // Controls

        this.input.keyboard.on('keydown_E', this.end, this);
    },
    update: function() {
        'use strict';
        console.log('[PLAY] update');
    },
    extend: {
        end: function() {
            'use strict';
            game.scene.start('end');
            game.scene.remove('play');
        }
    }
};

endScene = {
    key: 'end',
    create: function() {
        'use strict';
        var scoreLbl, nameLbl, startLbl, wKey;

        scoreLbl = this.add.text(600, 10, 'Score: ' + score,
                                 {font: '30px Courier',
                                  fill: '#ffffff'});
        nameLbl = this.add.text(80, 160, 'YOU WIN',
                                {font: '50px Courier',
                                 fill: '#ffffff'});
        startLbl = this.add.text(80, 240, 'press "W" to restart',
                                 {font: '30px Courier',
                                  fill: '#ffffff'});

        this.input.keyboard.on('keydown_W', this.restart, this);
    },
    update: function() {
        'use strict';
        console.log('[END] update');
    },
    extend: {
        restart: function() {
            'use strict';
            console.log('[END] restart');
            game.scene.start('title');
            game.scene.remove('end');
        }
    }
};


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
    scene: [ bootScene, loadScene, titleScene, playScene, endScene ]
};

game = new Phaser.Game(gameConfig);
game.scene.start('boot', { someData: '...arbitrary data' });
