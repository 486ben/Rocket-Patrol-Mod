//ZhiBin Huang
//1800336
//CMPM 120 Spring 2022.


class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        //load the background for menu
        this.load.image('starfield', './assets/background.png');
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/finish.mp3');
        this.load.audio('sfx_rocket', './assets/study.mp3');
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
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Welcome to "Hit the book Patrol"', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'The ←→ or A,D arrows is move & push F,M for fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = 'blue';
        menuConfig.color = 'yellow';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← with one player or → with two players ', menuConfig).setOrigin(0.5);
        
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
    }

    update() {
      if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        // One person mode
        game.settings = {
          spaceshipSpeed: 3,
          gameTimer: 60000,
          players: 1    
        }
        this.sound.play('sfx_select');
        this.scene.start("playScene");   
      }
      if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
        // Two player battle mode
        game.settings = {
          spaceshipSpeed: 5,
          gameTimer: 45000,
          players: 2
        }
        this.sound.play('sfx_select');
        this.scene.start("playScene");  
      }
    }

}