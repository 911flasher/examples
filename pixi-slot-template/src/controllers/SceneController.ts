import { Container } from "pixi.js";
import { App } from "../app";
import { Scene } from "../scene";


export enum SceneLayer { UI, GAME };

export class SceneController {

    public lastLoadedScene: Scene;
    private loadedScenes: Scene[] = [];

    private uiLayer: PIXI.Container;
    private gameLayer: PIXI.Container;

    constructor() {
        this.gameLayer = new Container();
        this.uiLayer = new Container();
        //
        this.gameLayer.interactive = true;
        this.uiLayer.interactive = true;

        App.application.stage.addChild(this.gameLayer);
        App.application.stage.addChild(this.uiLayer);
        App.application.ticker.add(this.mainUpdate.bind(this));

    }

    public loadScene(scene: any, layer: SceneLayer, additive: boolean = false): void {

        if (!additive && this.lastLoadedScene) {

            for (var i = this.loadedScenes.length - 1; i >= 0; i--) {
                if (this.loadedScenes[i] === this.lastLoadedScene) {
                    this.loadedScenes.splice(i, 1);
                    break;
                }
            }
            this.removeSceneContainer();
            this.lastLoadedScene.destroy();
            this.lastLoadedScene = undefined;
        }
        this.lastLoadedScene = new scene(layer);
        this.loadedScenes.push(this.lastLoadedScene);
        this.addSceneContainer();//load first scene;
        
    }

    public destroyCurrentScene() : void
    {
        for (var i = this.loadedScenes.length - 1; i >= 0; i--) {
            if (this.loadedScenes[i] === this.lastLoadedScene) {
                this.loadedScenes.splice(i, 1);
                break;
            }
        }
        this.removeSceneContainer();
        this.lastLoadedScene.destroy();
        this.lastLoadedScene = undefined;

        if(this.loadedScenes.length < 1)  
            throw new Error("No scenes availables!.");
        else
        {
            this.lastLoadedScene = this.loadedScenes[this.loadedScenes.length - 1];
        }
    }

    private removeSceneContainer(): void {
        if (this.lastLoadedScene.layer == SceneLayer.UI)
            this.uiLayer.removeChild(this.lastLoadedScene.sceneContainer);
        else
            this.gameLayer.removeChild(this.lastLoadedScene.sceneContainer);

    }

    private addSceneContainer(): void {
        if (this.lastLoadedScene.layer == SceneLayer.UI){
            this.uiLayer.addChild(this.lastLoadedScene.sceneContainer);
        }
        else{
            this.gameLayer.addChild(this.lastLoadedScene.sceneContainer);
        }
            
    }

    private mainUpdate(delta): void {
        this.loadedScenes.forEach(scene => {
            scene.update(delta);
        });
    }

    public tick(delta:number):void {
    
    }

   
    public resize(_x:number, _y:number,scale:number){
        this.uiLayer.position.set(_x,_y);
        this.uiLayer.scale.set(scale);
        this.gameLayer.position.set(_x,_y);
        this.gameLayer.scale.set(scale);
    }
}