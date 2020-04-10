import ASSETS from '../assets';
export enum loadTypes { image = 'img', sound = 'sound' };
export class Resources
{
    
    static loadResources(cbProgress: Function, cbComplete: Function): void {

       
        this.loaderAddByArray(ASSETS.images, loadTypes.image);
        this.loaderAddByArray(ASSETS.preloadImages, loadTypes.image);
        this.loaderAddByArray(ASSETS.sounds,loadTypes.sound);
        this.loaderAddByArray(ASSETS.particles,loadTypes.image);

        PIXI.loader.on('progress', () => {
            cbProgress(PIXI.loader.progress);
        })

        PIXI.loader.load(() => {
            loadedFiles = PIXI.loader.resources;
            cbComplete();
        });
    }
    
    static loaderAddByArray = function (arrTemp, type){
        // switch(type){
        //     case loadTypes.image: {
                Object.keys(arrTemp).forEach(key => {
                    let path = arrTemp[key].content;
                    PIXI.loader.add(arrTemp[key].name, path);
                });
            //     break;
            // }
            //todo: error case 
        // }
    
    };
}

export let imagesRes = {  title : 'title', particle:'particle' }; 
export let audiosRes = { }; 
export let spriteSheetRes = { }; 
export let loadedFiles: PIXI.loaders.Resource | PIXI.loaders.ResourceDictionary;