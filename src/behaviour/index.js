import resetSettings from './resetSettings';
import buildCastle from './buildCastle';
import waterWaves from './waterWaves';
import resetWaves from './resetWaves';
import hideElement from './hideElement';
import drinkWaves from './drinkWaves';
import initializeBlocks from './initializeBlocks';
import buildTower from './buildTower';

export default class {
    constructor(blocks, blockSprites, gifs, gifsContainer) {
        this.blocks = blocks;
        this.blockSprites = blockSprites;
        this.time = 0;
        this.counter = 0;
        this.gifs = gifs;
        this.waterPower = 0;
        this.gifsContainer = gifsContainer;
    }

    reset(strength) {
        this.waterPower = 0;
        resetSettings(this.blocks, strength);
    }

    toInitial() {
      this.time = 100;
      this.waterPower = 0;
      this.gifsContainer.alpha = 1;
      this.gifsContainer.y = 0;
      this.gifs.flag.pole.visible = false;
      this.gifs.flag.disk.visible = false;
      this.gifs.flag.canvas.visible = false;
      this.gifs.flag.point.visible = false;
      this.gifs.flag.canvas.width = 1;
      this.blocks.forEach(block => {
        block.destination = block.sky + 300;
        block.strength = 0;
      })
    }

    performance(type) {
        switch(type) {
            case 'INIT':
                initializeBlocks(this.blockSprites.children, this.time, 200);
                break;
            case 'CASTLE': 
                buildCastle(this.time, this.counter, 601, this.blockSprites, this.gifs.flag, this.blocks)
                break;
            case 'WATER': 
                this.waterPower = waterWaves(this.blocks, this.time, this.waterPower);
                break;
            case 'DRINK':
                drinkWaves(this.blocks, this.time, 1100, this.counter);
                break;
            case 'TOWER':
                this.waterPower = buildTower(this.blocks, this.blockSprites.children, this.time, this.waterPower);
                break;
            default:
                resetWaves(this.blocks);
        }
    }

    hideGif(endTime) {
        hideElement(this.time, endTime, this.gifsContainer);
    }

    play() {
        this.counter += 0.047;
        this.time++;
        if(this.time < 200) this.performance('INIT');
        else if(this.time < 600) this.performance('WATER');
        else if(this.time === 600) this.reset();
        else if(this.time < 1100) this.performance('CASTLE');
        else if(this.time === 1100) this.reset();
        else if(this.time < 1400) this.performance('DRINK');
        else if(this.time < 1900) this.performance('TOWER');
        else this.toInitial();

        if(this.time > 1100 && this.time < 1200) {
            this.hideGif(1200);
        }
    }
}