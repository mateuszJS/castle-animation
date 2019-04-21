import circleForm from '../utils/circleForm';

export default (blocks, time, power) => {
  const modifyBlock = block => block.strength = -5;

  if(time % 6 === 0) {
    circleForm(blocks,
      power,
      {x: Math.floor(_ROW_QUANTITY_/2),
        y: Math.floor(_ROW_QUANTITY_/2)},
      modifyBlock);
      power++;
    }

  const calcNewY = (block) => {
    block.y += block.strength;
    block.alpha = (block.sky - block.y) / 100 + 1;
    if(block.y < block.sky) {
      block.strength += 0.1;
    } else {
      block.strength -= 0.1;
    }
    block.strength *= 0.99;
    if(Math.abs(block.y - block.sky) < 0.2 && Math.abs(block.strength) < 0.2)
      block.strength = 0;
  }

  blocks.map(calcNewY);
  return power;
}