let score, game;

score = 0;

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
        this.add.text(80, 160, 'loading...',
                      {font: '30px Courier',
                       fill: '#ffffff'})

        // Load images

        // Load sound effects
    }

    create() {
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
        this.add.text(80, 160, 'SYMSTONE',
                      {font: '50px Courier',
                       fill: '#ffffff'})
        this.add.text(80, 240, 'press "W" to start',
                      {font: '30px Courier',
                       fill: '#ffffff'})

        this.input.keyboard.on('keydown-W', this.start, this)
    }

    update() {
        console.log('[TITLE] update')
    }

    start() {
        console.log('[TITLE] start')
        game.scene.switch('title', 'play')
    }
}

class PlayScene extends Phaser.Scene {
    constructor() {
        super('play');

        this.mainLine = null;
        this.sideLine = null;

        this.mainPanels = {
            'board': {
                'stones': null,
                'edges': null,
            },
            'side': {
                'stones': null,
            },
        };
        this.userPanels = {
            'board': {
                'stones': null,
                'edges': null,
            },
            'side': {
                'stones': null,
            },
        };

    }

    create() {
        let that = this;

        this.graphics = this.add.graphics();

        /** Lines **/
        const lineColor = 0x888888;

        this.mainLine = this.add.line(0, 0, 0, 300, 800, 300, lineColor).setOrigin(0);
        this.sideLine = this.add.line(0, 0, 700, 0, 700, 600, lineColor).setOrigin(0);

        /** Stones **/
        const order = 6;
        const sideStepSize = 30;
        const boardRadius = 100;

        // main board stones
        this.mainPanels.board.stones = this.circlePositions([350, 150], boardRadius, order)
            .map(this.createStone, that);

        // user board stones
        this.userPanels.board.stones = this.circlePositions([350, 450], boardRadius, order)
            .map(this.createStone, that);

        // main side stones
        this.mainPanels.side.stones = this.sidePositions([750, 30], sideStepSize, order)
            .map(this.createStone, that);

        // user side stones
        this.userPanels.side.stones = this.sidePositions([750, 330], sideStepSize, order)
            .map(this.createStone, that);

        /** Edges **/

        // main board edges
        this.mainPanels.board.edges = this.createEdges(this.mainPanels.board.stones, boardRadius, order);

        // user board edges
        this.userPanels.board.edges = this.createEdges(this.userPanels.board.stones, boardRadius, order);

        /** Controls **/
        this.keyControls = this.input.keyboard.addKeys({
            'end': Phaser.Input.Keyboard.KeyCodes.E,
        });

        this.input.mouse.disableContextMenu();
    }

    createStone(position, index) {
        const x = position[0];
        const y = position[1];
        const stoneColor = 0x888888;
        const stoneRadius = 10;

        let stone = this.add.circle(x, y, stoneRadius, stoneColor);

        stone.setInteractive();
        stone.setStrokeStyle(1, 0x000000);
        stone.data = {
            index,
            state: 'off',
        };

        stone.on('pointerdown', function (pointer, localX, localY, event) {
            if (stone.data.state === 'off') {
                stone.data.state = 'on';
                stone.setFillStyle(0xeeeeee);
            } else {
                stone.data.state = 'off';
                stone.setFillStyle(stoneColor);
            }
        });

        return stone;
    }

    sidePositions(origin, stepSize, order) {
        const positions = [];

        for (let i=0; i<order; i++) {
            positions.push([origin[0], origin[1] + (i * stepSize)]);
        }

        return positions;
    }

    circlePositions(origin, radius, order) {
        const angleDiff = 2*Math.PI/order;
        const positions = [];
        let angle=Math.PI/2;

        for (let i=0; i<order; i++) {
            const tempAngle = angle + angleDiff*i;
            const diffX = Math.cos(tempAngle) * radius;
            const diffY = -Math.sin(tempAngle) * radius;
            positions.push([origin[0] + diffX, origin[1] + diffY]);
        }

        return positions;
    }

    createEdges(stones, radius, order) {
        const edgeColor = 0xEEEEEE;
        const edges = [];
        this.graphics.lineStyle(3, edgeColor, 1);

        for (let i=0; i<order; i++) {
        // for (let i=0; i<3; i++) {
            const stone1 = stones[i];
            let stone2;
            if (i < order-1) {
                stone2 = stones[i+1];
            } else {
                stone2 = stones[0];
            }
            const startPoint = new Phaser.Math.Vector2(stone1.x, stone1.y);
            const endPoint = new Phaser.Math.Vector2(stone2.x, stone2.y);
            const offset = new Phaser.Math.Vector2(5, 5);
            const controlPoint = startPoint.clone().add(endPoint).scale(0.5);
            // console.log(`controlPoint: (${controlPoint.x}, ${controlPoint.y})`);
            const edge = new Phaser.Curves.QuadraticBezier(startPoint, controlPoint, endPoint);
            edge.draw(this.graphics);
            edges.push(edge);
        }

        return edges;
    }

    getArcParams(pos1, pos2, radius) {
        let arcParams = {
            x: null,
            y: null,
            startAngle: null,
            endAngle: null,
        };


        return arcParams;
    }

    update() {
        // console.log('[PLAY] update');

        if (this.keyControls.end.isDown) {
            this.end();
        }

        let pointer = this.input.activePointer;

        if (pointer.rightButtonDown()) {
            console.log(`Right Button (${pointer.worldX}, ${pointer.worldY})`);
        }

        if (pointer.leftButtonDown()) {
            console.log(`Left Button (${pointer.worldX}, ${pointer.worldY})`);
        }
    }

    /**
     * Add a single enemy to the screen.
     */
    addStone() {
        let stone;

        console.log('addStone()');

        stone = this.mainSideStones.getFirstDead(false);
    }

    end() {
        console.log('[PLAY] end');
        game.scene.switch('play', 'end');
    }
}

class EndScene extends Phaser.Scene {
    constructor() {
        super('end')
    }

    create() {
        this.add.text(600, 10, 'Score: ' + score,
                      {font: '30px Courier',
                       fill: '#ffffff'})
        this.add.text(80, 160, 'YOU WIN',
                      {font: '50px Courier',
                       fill: '#ffffff'})
        this.add.text(80, 240, 'press "W" to restart',
                      {font: '30px Courier',
                       fill: '#ffffff'})

        this.input.keyboard.on('keydown-W', this.restart, this)
    }

    update() {
        console.log('[END] update')
    }

    restart() {
        console.log('[END] restart')
        game.scene.switch('end', 'title')
    }
}


const gameConfig = {
    type: Phaser.CANVAS,
    parent: 'game-div',
    width: 800,
    height: 600,
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
