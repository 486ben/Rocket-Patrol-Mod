//ZhiBin Huang
//1800336
//CMPM 120 Spring 2022.


// Spaceship prefab
class Spaceship_x extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene
        this.points = pointValue;   // store pointValue
        this.moveSpeed = 8;         // spaceship-x is more faster
    }

    update() {
        // move spaceship left
        this.x -= this.moveSpeed;
        // wrap around from left edge to right edge
        if(this.x <= 0 - this.width) {
            this.reset();
        }
    }

    reset(){
        this.x = game.config.width;
    }
}