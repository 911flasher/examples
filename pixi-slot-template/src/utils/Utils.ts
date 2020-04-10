import { Tween } from '@tweenjs/tween.js';
import { ScreenSize } from '../config/settings';

export default class Utils{

    static randomInt(min:number, max:number):number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static playTweenSequence(tweenConfigs:any[] = []):Tween {
        let startTween:Tween,
            prevTween:Tween,
            tween;

        tweenConfigs.forEach((config) => {
            tween = new Tween(config.target)
                .to(config.to, config.time);
            if(config.onComplete){
                tween.onComplete(config.onComplete);
            }

            if(config.easing){
                tween.easing(config.easing);
            }

            if(!startTween){
                startTween = prevTween = tween;
            } else {
                prevTween.chain(tween);
                prevTween = tween;
            }
        });

        return startTween.start();
    }

    static getShaderSize():number {
        return Math.max(ScreenSize.width,ScreenSize.height)*2;
    }
}
