import Sprite from '../utils/Sprite';
import { Easing, Tween } from '@tweenjs/tween.js';
import Audio from '../media/Audio';

const TIMERS = {
    HIDE: 200,
    SCALE_DOWN: 200,
    SCALE_UP: 200,
    ANIMATE: 800
};

export default class TextButton extends PIXI.Sprite{
    private _animation:Tween;

    private loadingText : PIXI.Text;

    private graphicsBG: PIXI.Graphics;

    constructor(title,w,h){
        super();

        this.interactive = true;
        this.buttonMode = true;

        const loadingStyle = new PIXI.TextStyle({
            fill: "#000000",
            fontSize: 60
        });

        this.loadingText = new PIXI.Text(title, loadingStyle);
        this.loadingText.anchor.set(0.5);
        this.addChild(this.loadingText);
        this.drawBG(w,h);
        this.loadingText.position.set( -(this.loadingText.width - w)/2 , -(this.loadingText.height - h)/2 );
        this._addListeners();
        this._animate();
    }

    public hide():void {
        Audio.playSound("button");
        this._animation.stop();
        this.interactive = false;
        this.alpha=0.5;
    }

    public show():void {
        Audio.playSound("button");
        this._animate();
        this.interactive = true;
        this.alpha=1;
    }

    private _addListeners():void {
        this.on("pointerdown", () => this._scaleDown());
        this.on("pointerup", () => this._scaleUp());
        this.on("pointerupoutside", () => this._scaleUp());
    }

    private _scaleDown():void {
       
    }

    private _scaleUp():void {
       
    }

    private _animate():void {
        this._animation = new Tween(this.scale)
            .easing(Easing.Sinusoidal.InOut)
            .to({ x: 1.2, y: 1.2 }, TIMERS.ANIMATE)
            .yoyo(true)
            .repeat(Infinity)
            .start();
    }

    private drawBG(w:number, h:number){
        if(!this.graphicsBG){
            this.graphicsBG = new PIXI.Graphics();
        }
        let rect = this.getBounds();
        this.graphicsBG.clear();

        this.graphicsBG.clear();
        this.graphicsBG.lineStyle(2, 0x4a1850, 1);
        this.graphicsBG.beginFill(0x4a18aa, 0.25);
        this.graphicsBG.drawRoundedRect(rect.x, rect.y, w > rect.width? w :rect.width,h> rect.height+30?h:rect.height+30, 15);
        this.graphicsBG.endFill(); 
        this.addChildAt(this.graphicsBG,0); 

    }
}
