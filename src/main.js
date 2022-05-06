//ZhiBin Huang
//1800336
//CMPM 120 Spring 2022.

//Name:ZhiBin Huang
//Project title: Rocket Patrol Mods(Hit the book Patrol)
//I spend like 4 days with almost 14 hours because it is super challenging to redesign the game.
//I redesign the rocket as a pencil, spaceship as a book, and create a  
//Things I improve the rocket mod:
//   1. Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60)
//   2. Implement a simultaneous two-player mode (30)
//   3. Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
//   4. Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (20) 

//I also get some help from the source. Here is the citation.
// music free from: https://elements.envato.com/
//second music free from: https://freesound.org/


let config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 860,
  scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT,keyA, keyD,keyM;
