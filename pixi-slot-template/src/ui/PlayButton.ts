import Sprite from '../utils/Sprite';
import { Easing, Tween } from '@tweenjs/tween.js';
import Audio from '../media/Audio';

const TIMERS = {
    HIDE: 200,
    SCALE_DOWN: 200,
    SCALE_UP: 200,
    ANIMATE: 800
};

export default class PlayButton extends Sprite{
    private _animation:Tween;

    constructor(){
        super("play_button");

        this.interactive = true;
        this.buttonMode = true;

        this._addListeners();
        this._animate();
    }

    public hide():void {
        Audio.playSound("button");
        this._animation.stop();
        this.interactive = false;
        this.fadeTo(0, TIMERS.HIDE).onComplete(() => {
            this.destroy();
        });
    }

    private _addListeners():void {
        this.on("pointerdown", () => this._scaleDown());
        this.on("pointerup", () => this._scaleUp());
        this.on("pointerupoutside", () => this._scaleUp());
    }

    private _scaleDown():void {
        this.scaleTo(0.8, TIMERS.SCALE_DOWN);
    }

    private _scaleUp():void {
        this.scaleTo(1, TIMERS.SCALE_UP);
    }

    private _animate():void {
        this._animation = new Tween(this.scale)
            .easing(Easing.Sinusoidal.InOut)
            .to({ x: 1.2, y: 1.2 }, TIMERS.ANIMATE)
            .yoyo(true)
            .repeat(Infinity)
            .start();
    }
}
