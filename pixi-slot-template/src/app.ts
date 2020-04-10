import { Settings, ScreenSize } from "./config/settings";
import * as PIXI from 'pixi.js';
import * as TWEEN from '@tweenjs/tween.js';
import { SceneController, SceneLayer } from "./controllers/SceneController";

const MAX_DELTA = 40;

export class App extends PIXI.Application {
    private _width:number;
    private _height:number;

    private static instance: App;
    
    private static _sceneController: SceneController;
   

    constructor(width: number, height: number, resolution: number) {
        var canvas = <HTMLCanvasElement> document.getElementById('canvas');
        super( {
            view : canvas,
            antialias: false,
            backgroundColor: Settings.BgColor,
            roundPixels: Settings.RoundPixels,
            width: ScreenSize.width,
            height: ScreenSize.height
        });

        this._width = ScreenSize.width;
        this._height = ScreenSize.height;
        
        document.body.appendChild(this.view);
        
    }

    private init(): void {
        
        App.sceneController.loadScene(Settings.Scenes.LoadScene, SceneLayer.UI);
        
        this.ticker.add(() => {
            this._tick();
        });
        this.ticker.add(() => {
            TWEEN.update();
        });
        this.resize(true);
    }

    private _tick():void {
        let delta = PIXI.ticker.shared.elapsedMS;

        if(delta > MAX_DELTA) delta = MAX_DELTA;

        if(App.sceneController.lastLoadedScene && App.sceneController.lastLoadedScene.tick) {
            App.sceneController.lastLoadedScene.tick(delta);
        }
    }

    public static get application(): App {
        if (!this.instance) {
            this.instance = new App(window.innerWidth, window.innerHeight, window.devicePixelRatio);
            this.startControllers();
            this.instance.addListeners();
            this.instance.init();
        }
        return this.instance;
    }

    static get sceneController(): SceneController {
        return this._sceneController;
    }

    private static startControllers(): void {
        this._sceneController = new SceneController();
    }
    
    private addListeners(): void {
        window.addEventListener('resize', this.resize.bind(this));
        this.resize(true);
    }
   
    resize (forced:boolean){
        
        const width = window.innerWidth,
        height = window.innerHeight;

        if(this._width === width && this._height === height && !forced) {
            return;
        }

        this._width = width;
        this._height = height;

        document.body.style.width = width + "px";
        document.body.style.height = height + "px";

        this.renderer.resize(width, height);

        if( App.sceneController.lastLoadedScene){
            // debugger;
            // App.sceneController.lastLoadedScene.position.set(this._app.renderer.width/2, this._app.renderer.height/2);
            App.sceneController.resize(this.renderer.width/2, this.renderer.height/2,this._getScale());
            
        }
    }
    
    private _getScale():number {
        return Math.min(this._width/ScreenSize.width, this._height/ScreenSize.height);
    }
}