//ZhiBin Huang
//1800336
//CMPM 120 Spring 2022.


class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }
    
    create() {

      // place tile sprite
      this.starfield = this.add.tileSprite(0, 0, 1500, 850, 'starfield').setOrigin(0, 0);

       // place tile sprite
      this.starfield = this.add.tileSprite(0, 0, 1500, 850, 'starfield').setOrigin(0, 0);
       
      // green UI background
      this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
     
      //check if two player
      if(game.settings.players == 2) {
        // if two player, just add rocket (p1) and (p2)
        this.p2Rocket = new Rocket1(this, game.config.width - 200, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        this.p1Rocket = new Rocket(this, game.config.width - 400, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
      }
      else {
        // if one player only, just add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
      }

      // white borders
      this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
      this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
      this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
      this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

      // add books (x3)
      this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
      this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
      this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);

      // teacher help 
      //spaceship-X is 100 point.
      this.ship04 = new Spaceship_x(this, game.config.width, borderUISize*2 + borderPadding*4, 'spaceship-x', 0,100).setOrigin(0, 0);

      // define keys
      //player 1
      keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
      keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
      //player 2
      keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
      keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

      // animation config
      this.anims.create({
        key: 'explode',
        frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 20, first: 0}),
        frameRate: 5
      });

      // initialize score
      this.p1Score = 0;

      // display score
      let scoreConfig = {
      fontFamily: 'Courier',
      fontSize: '28px',
      backgroundColor: 'blue',
      color: 'yellow',
      align: 'right',
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 100
    }
  this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

    // GAME OVER flag
    this.gameOver = false;

    // 60-second play clock
    scoreConfig.fixedWidth = 0;
    this.clock = this.time.delayedCall(60000, () => {
      this.add.text(game.config.width/2, game.config.height/2, 'It is time to quiz!', scoreConfig).setOrigin(0.5);
      this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to restudy or ← for Quiz!', scoreConfig).setOrigin(0.5);
      this.gameOver = true;
    }, null, this);


}

  update() {
      // check key input for restart / menu
      if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
          this.scene.restart();
      }

      if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          this.scene.start("menuScene");
      }

      this.starfield.tilePositionX -= 4;
      if (!this.gameOver) {
        this.p1Rocket.update();
        if(game.settings.players == 2) { 
          this.p2Rocket.update();     
      }  
        // update spaceships (x3)
        this.ship01.update();
        this.ship02.update();
        this.ship03.update();
        this.ship04.update();
      }

  // check collisions
  if(this.checkCollision(this.p1Rocket, this.ship04)) {
    this.p1Rocket.reset();
    this.shipExplode(this.ship04);   
  }
  if(this.checkCollision(this.p1Rocket, this.ship03)) {
    this.p1Rocket.reset();
    this.shipExplode(this.ship03);   
  }
  if (this.checkCollision(this.p1Rocket, this.ship02)) {
    this.p1Rocket.reset();
    this.shipExplode(this.ship02);
  }
  if (this.checkCollision(this.p1Rocket, this.ship01)) {
    this.p1Rocket.reset();
    this.shipExplode(this.ship01);
  }
  //for two players, add one more rocket
  if(game.settings.players == 2) { 
    if(this.checkCollision(this.p2Rocket, this.ship04)) {
      this.p2Rocket.reset();
      this.shipExplode(this.ship04);   
    }
    if(this.checkCollision(this.p2Rocket, this.ship03)) {
        this.p2Rocket.reset();
        this.shipExplode(this.ship03);
    }
    if (this.checkCollision(this.p2Rocket, this.ship02)) {
        this.p2Rocket.reset();
        this.shipExplode(this.ship02);
    }
    if (this.checkCollision(this.p2Rocket, this.ship01)) {
        this.p2Rocket.reset();
        this.shipExplode(this.ship01);
    }
}

  
}

  checkCollision(rocket, ship) {
      // simple AABB checking
      if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) {
              return true;
      } else {
          return false;
      }
  }

  shipExplode(ship) {
    // temporarily hide ship
    ship.alpha = 0;
    // create explosion sprite at ship's position
    let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
    boom.anims.play('explode');             // play explode animation
    boom.on('animationcomplete', () => {    // callback after anim completes
      ship.reset();                         // reset ship position
      ship.alpha = 1;                       // make ship visible again
      boom.destroy();                       // remove explosion sprite
    });       
    // score add and repaint
    this.p1Score += ship.points;
    this.scoreLeft.text = this.p1Score;
    this.sound.play('sfx_explosion'); 
  }

  preload() {
      // load images/tile sprites
      this.load.image('rocket', './assets/pen.png');
      this.load.image('spaceship', './assets/book.png');
      this.load.image('spaceship-x', './assets/spaceship-x.png');
      //this.load.image('starfield', './assets/starfield1.png');
      // load spritesheet
      this.load.spritesheet('explosion', './assets/explore.png', {frameWidth: 500, frameHeight: 500, startFrame: 0, endFrame: 500});
    }
  }