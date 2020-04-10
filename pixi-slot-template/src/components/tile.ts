import * as PIXI from "pixi.js";
// import { default as data } from "./../data";

import ASSETS from '../assets';
export class Tile extends PIXI.Container {

    public id: number;

    private tileWidth: number;
    private tileHeight: number;
    private border: PIXI.Graphics;
    private sprite: PIXI.Sprite;

    constructor(width: number, height: number) {
        super();

        this.tileWidth = width;
        this.tileHeight = height;

        this.border = new PIXI.Graphics();
        this.border.lineStyle(2, 0xaa0000);
        this.border.beginFill(0xaa0000, 0.2);
        this.border.drawRect(0, 0, width, height);
        this.addChild(this.border);

        this.sprite = new PIXI.Sprite();
        this.sprite.scale.set(1.6, 1.6);
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.position.set(width * 0.5, height * 0.5);
        this.addChild(this.sprite);
        this.swap();
    }

    public swap(): void {
        this.id = Math.floor(Math.random() * ASSETS.symbols.length);

         if (ASSETS.symbols[this.id].texture === null) {
            ASSETS.symbols[this.id].texture = PIXI.Texture.fromImage(ASSETS.symbols[this.id].filename);
        }

         this.sprite.texture = ASSETS.symbols[this.id].texture;
    }
}
