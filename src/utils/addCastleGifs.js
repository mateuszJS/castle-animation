export default (PIXI) => {
    const Texture = PIXI.Texture,
        resources = PIXI.loader.resources,
        Sprite = PIXI.Sprite,
        AnimatedSprite = PIXI.extras.AnimatedSprite;

    const framesDisk = [],
          flag = {};
    for (let i = 1; i < 19; i++) {
        framesDisk.push(Texture.fromFrame('disk' + i + '.png'));
    }
    
    flag.disk = new AnimatedSprite(framesDisk);
    const disk = flag.disk;
    disk.scale.set(0.4);
    disk.anchor.set(0.5);
    disk.animationSpeed = 0.65;
    disk.visible = false;
  
    const framesFlag = [];
    for (let i = 16; i > 3; i--) {
      framesFlag.push(Texture.fromFrame('flag' + i + '.png'));
    }
    flag.canvas = new AnimatedSprite(framesFlag);
    const canvas = flag.canvas;
    canvas.scale.set(0.25);
    canvas.anchor.set(0, 0);
    canvas.width = 1;
    canvas.animationSpeed = 0.3;
    canvas.visible = false;
  
  
    flag.pole = new Sprite(resources["flagPole.png"].texture);
    const pole = flag.pole;
    pole.anchor.set(0.5, 1);
    pole.height = 1;
    pole.width = 10;
    pole.visible = false;
  
    flag.point = new Sprite(resources["flagPoint.png"].texture);
    const point = flag.point;
    point.anchor.set(0.5);
    point.scale.set(0.5);
    point.visible = false;
  
    return flag;
  }