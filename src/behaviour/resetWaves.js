export default (blocks) => {
  const calcNewY = (block) => {
    block.y += block.strength;
    if(block.y < block.sky) {
      block.strength += 0.1;
    } else {
      block.strength -= 0.1;
    }
    block.strength *= 0.99;
    if(Math.abs(block.y - block.sky) < 1 && Math.abs(block.strength) < 1) {
      block.strength = 0;
      block.y = block.sky;
    }

    if(block.alpha !== 1) {
      block.alpha += (1 - block.alpha) / 20;
    }
  }

  blocks.map(calcNewY);
}