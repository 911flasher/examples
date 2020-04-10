import * as PIXI from 'pixi.js';
import { Tween } from '@tweenjs/tween.js';

interface ImoveTween {
    x:number,
    y:number,
    time:number,
    easing:any
}

export default class Sprite extends PIXI.Sprite{
    constructor(name:string){
        super();

        this.texture = name ? PIXI.Texture.fromFrame(name) : PIXI.Texture.EMPTY;

        this.anchor.set(0.5);
    }

    public scaleTo(scale:number, time:number):Tween {
        return new Tween(this.scale)
            .to({ x: scale, y: scale }, time)
            .start();
    }

    public fadeTo(alpha:number, time:number):Tween {
        return new Tween(this)
            .to({ alpha: alpha }, time)
            .start();
    }

    public moveTo(params:ImoveTween):Tween {
        let tween = new Tween(this.position)
            .to({ x : params.x, y: params.y }, params.time);

        if(params.easing) {
            tween.easing(params.easing);
        }

        return tween.start();
    }
}
