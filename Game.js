import {BoxShape, Vec2, World } from 'planck';
const world = new World();

import { Scene } from 'phaser';
export class Game extends Scene

{
    constructor ()
    {
        super('Game');
        this.worldScale = 30;
    }
    
    CreateBox(posX,posY,width,height,isDynamic){
        let box = world.createBody()
        if (isDynamic){
            box.setDynamic();
        }
        box.createFixture(BoxShape(width/2/this.worldScale,height/2/this.worldScale))
        box.setPosition(Vec2(posX/this.worldScale,posY/this.worldScale))
        box.setMassData({
            mass:1,
            center:Vec2(),
            I:1
        });
        let color = new Phaser.Display.Color();
        color.random();
        color.brighten(50).saturate(100);
        let userData = this.add.graphics();
        userData.fillStyle(color.color,1);
        userData.fillRect(-width/2,-height/2,width,height);
        box.setUserData(userData);
    }

    create ()
    {
        
        world.setGravity(0,3);
        this.CreateBox(this.game.config.width/2,this.game.config.height - 20,this.game.config.width,40,false);
        this.tick = 0;
        this.time.addEvent({
            delay: 500,
            callbackScope: this,
            callback: function(){
                this.CreateBox(Phaser.Math.Between(100, this.game.config.width - 100), -100, Phaser.Math.Between(20, 80), Phaser.Math.Between(20, 80), true);
                this.tick ++;
                if(this.tick == 100){
                    this.scene.start("PlayGame");
                };
            },
            loop: true
        });
    }


    update(){
        world.step(1/30);
        world.clearForces();
        for (let b = world.getBodyList(); b; b = b.getNext()){
 
            // get body position
            let bodyPosition = b.getPosition();
 
            // get body angle, in radians
            let bodyAngle = b.getAngle();
 
            // get body user data, the graphics object
            let userData = b.getUserData();
 
            // adjust graphic object position and rotation
            userData.x = bodyPosition.x * this.worldScale;
            userData.y = bodyPosition.y * this.worldScale;
            userData.rotation = bodyAngle;
        }

    }
    
}
