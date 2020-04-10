
import { SceneLayer } from "../controllers/SceneController";
import { Settings, ScreenSize } from "../config/settings";
import { Resources } from "../config/resources";
import { App } from "../app";
import { Scene } from "../scene";

import Sprite from '../utils/Sprite';
import Utils from '../utils/Utils';
import ProgressBar from '../media/ProgressBar';
import PlayButton from '../ui/PlayButton';

const STATE = {
    LOADED: "loaded",
    INPROGRESS: "inprogress"
};
const SPINNER_ROTATION_PERIOD = 400;

  export class LoadScene extends Scene {
 
    private loadingText : PIXI.Text;

    private isLoaderUI:boolean;
    private spinner:Sprite;
    private screen:PIXI.Graphics;
    private progressBar:ProgressBar;
    private delayProgress: 100;
    private state:string;
    private playButton:PlayButton;
    
    constructor(layer : SceneLayer) {
        super(layer);
        
        this.create();
    }

    protected create(): void {
        
        this.screen = this.initPreloadScreen();
        this._redrawScreen("0x00ffss");
        const loadingStyle = new PIXI.TextStyle({
            fill: "#00",
            fontSize: 60
        });
       

        this.loadingText = new PIXI.Text('Please Wait.', loadingStyle);
        this.loadingText.anchor.set(0.5);
        this.sceneContainer.addChild(this.loadingText);
        this.state = STATE.INPROGRESS;
        Resources.loadResources(this.onLoadProgressChange.bind(this), this.onLoadComplete.bind(this));  
    }
    
    
    
       
    private onLoadProgressChange(progress : number) : void {
        this.loadingText.text = 'loading ' + progress.toFixed(0) + '%';

        setTimeout(()=> {this.updateProgressBar(progress,()=>this.delayProgress += 100) ,  this.delayProgress});
        console.log("progress = "+ progress);
    }
    
    private onLoadComplete() : void {
       
        this.initLoadAnimation();
        this._redrawScreen("0xfccfff");
        setTimeout(()=>
        {this.loadingText.text = 'Click to start game!';
        this.sceneContainer.removeChild(this.spinner)}
        , 500);
    }

    public update(delta: number): void {
        //update by app tiker;
    }

    public tick(delta:number):void {
        if(this.spinner){
            this.spinner.rotation += delta/SPINNER_ROTATION_PERIOD;
        }
    }

    public resize(_x:number, _y:number,scale:number){
        //this.sceneContainer.position.set(_x,_y);
        // this.sceneContainer.scale.set(scale);
        // this.playButton.position.set( this.loadingText.x + this.loadingText.width/2, this.loadingText.y + (this.loadingText.height+30));  

    }

    private _redrawScreen(color:string):void {
        let size = Utils.getShaderSize();
        if(this.screen){
            this.screen.clear()
             .beginFill(+color, 1)
             .drawRect(0, 0, size,size);
            this.screen.position.set(-size/2, -size/2);
        }
    }

    private initPreloadScreen():PIXI.Graphics {
        return  this.sceneContainer.addChild(new PIXI.Graphics());
    }
    
    private initLoadAnimation():void {
        this.spinner = this.sceneContainer.addChild(new Sprite("preload_spinner"));
        this.progressBar = this.sceneContainer.addChild(new ProgressBar());
        this.spinner.position.set( 0, -150);
        this.progressBar.position.set( this.loadingText.x + this.loadingText.width, this.loadingText.y + (this.loadingText.height+10));  
        this.addPlayButton();

    }
    private updateProgressBar(progress:number, func):void {
        func();
        if(this.progressBar){
            this.progressBar.update(progress);
        }
    }

    private addPlayButton():void {
        this.playButton = this.sceneContainer.addChild(new PlayButton());
        this.playButton.anchor.set(0.5);
        this.playButton.on("pointerup", () => {
            this.playButton.hide();
            this.start();
            
        });
        this.playButton.position.set( 0,200);  
    }

    private start():void {
        this.state = STATE.LOADED;
        //game start actions
        setTimeout(()=>
        App.sceneController.loadScene(Settings.Scenes.MainMenuScene, SceneLayer.UI), 500);
    }
}