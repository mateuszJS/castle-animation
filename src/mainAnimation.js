import * as PIXI from 'pixi.js';
import createBlock from './createBlock';
import sortArray from './sortArray';
import Behaviour from './behaviour';
import createCastleGifs from './utils/addCastleGifs';

//Aliases-------------------------------------
const Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    ParticleContainer = PIXI.particles.ParticleContainer;

//Pixi main config-------------------------------------
const mainContainer = new Container();
const renderer = autoDetectRenderer(1, 1, { view:  document.querySelector('.animation-block'), transparent: true });

const blockSize = 29,//56,
      blockAngle = -33,
      options = {
        scale: false,
        position: true,
        rotation: false,
        uvs: false,
        alpha: true
      },
      sprites = new ParticleContainer(_QUANTITY_, options),
      gifs = {
        flag: {}
      },
      gifsContainer = new Container();

let blocks = new Array(_QUANTITY_),
    behaviour;

loader
  .add([
    'smallBlock.png',
    'flagDisk.json',
    'flag.json',
    'flagPoint.png',
    'flagPole.png',
    'gradientLayer.svg',
    ])
  .load(setup);

  //1600 it's primary resoltuion, in this resoultion I have create layout
const getScalar = () => window.innerWidth * calcResizeFactor() / (1600 * 0.365);
const calcResizeFactor = () => {
  const width = window.innerWidth
  if (width > 1400) return 0.365;
  else if (width >= 1000) return 0.35;
  // else if (width >= 800) return 0.65;
  else if (width > 500) return 0.4;
  return 0.85;
}
function resize() {

  renderer.resize(Math.round(window.innerWidth * calcResizeFactor()), getScalar() * 1100 * 0.76);
  mainContainer.scale.set(getScalar());
}
window.addEventListener('resize', resize);


function setup() {
  gifs.flag = createCastleGifs(PIXI);
  sprites.y = 480;

  for(let i = 0; i < _QUANTITY_; i++) {
    blocks[i] = createBlock(Sprite, resources["smallBlock.png"].texture, blockSize, blockAngle, i);
  }
  sprites.opacity = 0.5;
    // sprites.tint = 0x6effae;

    const idArr = sortArray(blocks);
    idArr.map( elm => sprites.addChild(blocks[elm.id]) );
    
    // sprites.x = Math.round(window.innerWidth * 0.38);
    mainContainer.addChild(sprites);


    const gradientLayer = new Sprite(resources['gradientLayer.svg'].texture);
    gradientLayer.pivot.set(0, 0);
    gradientLayer.y = 350;
    gradientLayer.scale.set(600 / gradientLayer.width);
    // gradientLayer.tint = 0x320041;// rgb(50, 0, 65);
    mainContainer.addChild(gradientLayer);

    // const frontGround = new Sprite(resources["frontGround.png"].texture);
    // mainContainer.addChild(frontGround);
    // frontGround.x = sprites.x - 289;
    // frontGround.y = 600;
    // frontGround.width = 712;

    gifsContainer.addChild(gifs.flag.disk, gifs.flag.canvas, gifs.flag.pole, gifs.flag.point);
    mainContainer.addChild(gifsContainer);
    behaviour = new Behaviour(blocks, sprites, gifs, gifsContainer);
    resize();
  }

function startRAF() {
  gameLoop();
}

function gameLoop() {
  requestAnimationFrame(gameLoop);
  if(behaviour) {
    behaviour.play();
  }
  renderer.render(mainContainer);
}

export default startRAF;