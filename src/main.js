//ZhiBin Huang
//1800336
//CMPM 120 Spring 2022.


let config = {
  type: Phaser.AUTO,
  width: 1500,
  height: 980,
  scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT,keyA, keyD,keyM;
