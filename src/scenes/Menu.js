//ZhiBin Huang
//1800336
//CMPM 120 Spring 2022.


class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        //load the background for menu
        this.load.image('starfield', './assets/starfield1.png');
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    }


    create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Fantasy',
            fontSize: '35px',
            backgroundColor: 'blue',
            color: '#f5f500',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        //show background
        this.add.tileSprite(0, 0, 1500, 850, 'starfield').setOrigin(0, 0);
        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Welcome to Rocket Patrol 2.0', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'The ←→ arrows is move & push F for fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = 'blue';
        menuConfig.color = 'yellow';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← or → to start the Game!', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
      }

}