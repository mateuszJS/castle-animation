import addStrength from '../utils/addStrength';

let radius = 0;
let counter = 0;
export default (blocks, time, power) => {
  if(time % 10 === 0 && counter < 14) {
    for(let i = 0; i <= counter; i++) {
        addStrength(blocks,
            i,
            {x: Math.floor(_ROW_QUANTITY_/2),
            y: Math.floor(_ROW_QUANTITY_/2)},
            -3);
           
    }  
    counter++;
    }

    if(counter === 14) {
      if(time % 3 === 0) {
          addStrength(blocks,
              radius++ % 14,
              {x: Math.floor(_ROW_QUANTITY_/2),
              y: Math.floor(_ROW_QUANTITY_/2)},
              9);
      }
    }

  const calcNewY = (block) => {
    if(block.strength % 8 === 1) {
      block.alpha = 3;
      block.strength = 0;
    } else {
    block.alpha *= 0.98;
    if(block.alpha < 1.01) block.alpha = 1;
    block.y += block.strength;
    //block.alpha = (block.sky - block.y) / 100 + 1;
    // if(block.y < block.sky) {
    //   block.strength += 0.1;
    // } else {
    //   block.strength -= 0.1;
    // }
    block.strength *= 0.95;
    // if(Math.abs(block.strength) < 0.5)
    //   block.strength = 0;
    }
  }

  blocks.map(calcNewY);
  return power;
}