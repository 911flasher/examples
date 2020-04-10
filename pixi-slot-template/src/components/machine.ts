import * as PIXI from "pixi.js";
// import { default as data } from "./../data";
import { Reel } from "./reel";
import { EVENTS } from '../config/events';

export class Machine extends PIXI.Container {

    private reels: Reel[];
    private currentReel: number;

    constructor(width: number, height: number, numberOfReels: number = 5,) {
        super();
        this.reels = [];

        const border: PIXI.Graphics = new PIXI.Graphics();
        border.lineStyle(10, 0xffffff, 1);

        const slicedWidth: number = width / numberOfReels;
        for (let i: number = 0; i < numberOfReels; i++) {
            const reel: Reel = new Reel(slicedWidth, height, i);
            reel.position.set(slicedWidth * i, 0);
            this.addChild(reel);
            this.reels.push(reel);
            border.drawRect(slicedWidth * i, 0, slicedWidth, height);
            reel.on("spincomplete", this.onReelSpinComplete.bind(this));
        }
        this.addChild(border);
    }

    public spinReels(delaySpin:number = 1500): void {
        this.currentReel = 0;
        let timeout: number = 0;
        this.emit(EVENTS.MAIN.ROUND_STARTED);
        for (const reel of this.reels) {
            setTimeout(reel.spin.bind(reel), timeout);
            timeout += 300;
        }
        setTimeout(this.stopReels.bind(this), delaySpin);
    }

    public stopReels(): void {
        this.reels[0].stop();
    }

    public update(delta: number): void {
        for (const reel of this.reels) {
            reel.update(delta);
        }
    }

    private onReelSpinComplete(event: Event): void {
        this.currentReel++;
        if (this.currentReel < this.reels.length) {
            this.reels[this.currentReel].stop();
        } else {
            this.analyseResult();
            this.emit(EVENTS.MAIN.ROUND_STOPED);
        }
    }

    private analyseResult(): void {
        // for (const line of Paylines.lines) {
        //     let sum: number = 0;
        //     for (let i: number = 0; i < line.length - 1; i++) {
        //         const a: number = this.reels[i].tiles[line[i]].id;
        //         const b: number = this.reels[i + 1].tiles[line[i + 1]].id;
        //         if (a === b) {
        //             sum++;
        //         } else {
        //             break;
        //         }
        //     }
        //     const first: number = this.reels[0].tiles[line[0]].id;
        //     const value: number = data.symbols[first].paytable[sum];
        //     if (value > 0) {
        //         // TODO: player won something
        //     }
        // }
    }
}
