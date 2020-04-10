import { SceneLayer } from "../../controllers/SceneController";
import { loadedFiles, imagesRes } from "../../config/resources";
import { Scene } from "../../scene";
import { ScreenSize } from "../../config/settings";
import TextButton from '../../ui/TextButton';
import { Machine } from "../../components/machine";
// import * as particles from 'pixi-particles';
import { EVENTS } from '../../config/events';
import ASSETS from '../../assets';

export class MainMenuScene extends Scene {

    private title: PIXI.Sprite;
    private particle: PIXI.Sprite;
//
    private graphicsBG: PIXI.Graphics;
    private textButton: TextButton;
    private machine: Machine;
    private arrayP = [];
    private dudeBoundsPadding = 100;
    private _tick = 0;
    private dudeBounds = new PIXI.Rectangle;
    private roundEndText = new PIXI.Text;

    constructor(layer: SceneLayer) {
        super(layer);
        //
        this.create();
    }

    protected create(): void {
        this.title = new PIXI.Sprite(loadedFiles[imagesRes.title].texture);
        const sprites = new PIXI.particles.ParticleContainer(10000, {
            scale: true,
            position: true,
            rotation: true,
            uvs: true,
            alpha: true
        });
        this.sceneContainer.addChild(sprites);
      ///
        var style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 46,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff', '#00ff99'], // gradient
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440
        });

        this.roundEndText = new PIXI.Text("Please click 'Spin' button! ", style);
        //this.roundEndText.visible = false;
        this.roundEndText.position.set(-50,-50);
        this.sceneContainer.addChild(this.roundEndText);
        ///
       
        var totalSprites = 100;
        var texture = loadedFiles[imagesRes.particle].texture

        //var emitter = new PIXI.particles.Emitter(sprites,[texture],ASSETS.particles[0].content);

        for (var i = 0; i < totalSprites; i++) {
        
            this.particle = new PIXI.Sprite(texture);
            this.particle.tint = Math.random() * 0xE8D4CD;

            // set the anchor point so the texture is centerd on the sprite
            this.particle.anchor.set(0.5);

            // different maggots, different sizes
            this.particle.scale.set(0.8 + Math.random() * 0.3);

            // scatter them all
            this.particle.x = Math.random() * 200;
            this.particle.y = Math.random() * 200;

            this.particle.tint = Math.random() * 0x808080;

            // create a random direction in radians
            ////this.particle.direction = Math.random() * Math.PI * 2;

            // this number will be used to modify the direction of the sprite over time
           //// this.particle.turningSpeed = Math.random() - 0.8;

            // create a random speed between 0 - 2, and these maggots are slooww
            ////this.particle.speed = (2 + Math.random() * 2) * 0.2;

            ////this.particle.offset = Math.random() * 100;

            // finally we push the dude into the maggots array so it it can be easily accessed later
            this.arrayP.push(this.particle);

            sprites.addChild(this.particle);
        }
        
        this.dudeBounds = new PIXI.Rectangle(-this.dudeBoundsPadding,
                                    -this.dudeBoundsPadding,
                                    this.sceneContainer.width + this.dudeBoundsPadding * 2,
                                    this.sceneContainer.height + this.dudeBoundsPadding * 2);

        ///

        this.title.anchor.set(0.5);
        this.title.position.set(0,-100)
        this.sceneContainer.addChild(this.title);
        //this.drawBG();
         // adds machine    
         this.addTextButton();
         this.machine = new Machine(340, 880, 1);
         this.machine.position.set(-500, -250);
         this.machine.scale.set(0.7);
         this.sceneContainer.addChild(this.machine);
         this.machine.on(EVENTS.MAIN.ROUND_STOPED, () => {
            this.textButton.show();
            this.roundEndText.visible = true;

        });
        this.machine.on(EVENTS.MAIN.ROUND_STARTED, () => {
            this.textButton.hide();

        });
    }

    public update(delta: number): void {
        if (this.machine) {
            this.machine.update(delta);
        }
    }

    public tick(delta:number):void {
        

            // iterate through the sprites and update their position
            for (var i = 0; i < this.arrayP.length; i++)
            {
                var dude = this.arrayP[i];
                dude.scale.y = 0.95 + Math.sin(this._tick + dude.offset) * 0.05;
                dude.direction += dude.turningSpeed * 0.01;
                dude.position.x += Math.sin(dude.direction) * (dude.speed * dude.scale.y);
                dude.position.y += Math.cos(dude.direction) * (dude.speed * dude.scale.y);
                dude.rotation = -dude.direction + Math.PI;
        
                // wrap the maggots
                if (dude.position.x < this.dudeBounds.x)
                {
                    dude.position.x += this.dudeBounds.width;
                }
                else if (dude.position.x > this.dudeBounds.x + this.dudeBounds.width)
                {
                    dude.position.x -= this.dudeBounds.width;
                }
        
                if (dude.position.y < this.dudeBounds.y)
                {
                    dude.position.y += this.dudeBounds.height;
                }
                else if (dude.position.y > this.dudeBounds.y + this.dudeBounds.height)
                {
                    dude.position.y -= this.dudeBounds.height;
                }
            }
        
    }
    
    public resize(_x:number, _y:number,scale:number){
        // this.sceneContainer.position.set(_x-this.sceneContainer.width*.5,_y-this.sceneContainer.height*.5);
        //this.sceneContainer.scale.set(scale);
        //this.drawBG();
    }
    
    private drawBG(){
        if(!this.graphicsBG){
            this.graphicsBG = new PIXI.Graphics();
        }
        let rect = this.sceneContainer.getBounds();
        this.graphicsBG.clear();
        this.graphicsBG.lineStyle(2, 0xFF00FF, 1);
        this.graphicsBG.beginFill(0xFF00BB, 0.25);
        this.graphicsBG.drawRoundedRect(rect.x+150, rect.y+250, 300, 600, 15);
        this.graphicsBG.endFill(); 
        
        this.graphicsBG.lineStyle(2, 0x0000FF, 0.1);
        this.graphicsBG.beginFill(0xFF700B, 0.1);
        this.graphicsBG.drawRect(rect.x, rect.y, rect.width, rect.height+110);
        this.graphicsBG.endFill();
        // graphics.lineStyle(2, 0x0000FF, 1);
        // graphics.beginFill(0xFF700B, 1);
        // graphics.drawRect(50, 250, 120, 120);

              


        this.sceneContainer.addChildAt(this.graphicsBG,0); 
    }

    private addTextButton():void {
        this.textButton = this.sceneContainer.addChild(new TextButton('Spin',200,150));
        this.textButton.anchor.set(0.5);
        this.textButton.on("pointerup", () => {
            this.roundEndText.visible = false;

            this.machine.spinReels(3000);
            this.textButton.hide();
        });
        this.textButton.position.set( 340,150);  
    }

}