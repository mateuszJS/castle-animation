import addStrength from '../utils/addStrength';

export default (blocks, time, startTime, counter) => {
  time -= startTime;
  const calcNewY = (block, idx) => {
    if(idx % 2) {
      if(block.alpha !== 1.6) {
        block.alpha += (1.6 - block.alpha) * 0.05;
        if(block.alpha > 1.59 && block.alpha < 1.61) {
          block.alpha = 1.6;
        }
      }
      block.y += ((Math.cos(counter + idx/100) * 35 + block.sky)-block.y) * 0.05;
    } else {
      if(block.alpha !== 1) {
        block.alpha += (1 - block.alpha) * 0.05;
        if(block.alpha > 0.99 && block.alpha < 1.01) {
          block.alpha = 1;
        }
      }
      block.y += ((-Math.cos(counter + idx/100) * 35 + block.sky)-block.y) * 0.05;
    }
  }
  blocks.map(calcNewY);
}

