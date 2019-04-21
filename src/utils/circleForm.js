import getBlockPosition from './getBlockPosition';

export default (blocks, radius, center, callback) => {
  const x0 = center.x,
        y0 = center.y,
        radiusMax = 10;

  let x = radius - 1,
      y = 0,
      dx = 1,
      dy = 1,
      err = dx - (radius << 1),
      stupidFix = 0;

      const moveThisBlock = (x, y) => {
        const pos = getBlockPosition(x, y);
        if(~pos) 
          callback(blocks[pos]);
      }

      const createCircle = (x1, y1) => {
        moveThisBlock(x1 + x0, y1 + y0);
        moveThisBlock(y1 + x0, x1 + y0);
        moveThisBlock(-x1 + x0, y1 + y0);
        moveThisBlock(-y1 + x0, x1 + y0);
        moveThisBlock(-x1 + x0, -y1 + y0);
        moveThisBlock(-y1 + x0, -x1 + y0);
        moveThisBlock(x1 + x0, -y1 + y0);
        moveThisBlock(y1 + x0, -x1 + y0);
      }

      const fixAlg = {
        7: 5,
        8: 8,
        9: 8,
        13: 10,
        11: 13,
        12: 13,
        17: 15,
        19: 15,
        16: 18,
        25: 20,
        21: 20,
        28: 22,
        20: 23,
        31: 25,
        23: 25,
        32: 27,
        41: 29
      };

      const fixAlgDouble = {
        8: 9,
        12: 14,
        17: 17,
        16: 19,
        21: 22,
        20: 24,
        25: 25,
      }

      const fixAlgThird = {
        12: 19,
        16: 22,
      }

  while (x >= y) {
    createCircle(x, y);
    if (err <= 0) {
      y++;
      err += dy;
      dy += 2;
      if(fixAlgThird[err] === radius)
        createCircle(x-1, y-1);
      if(fixAlgDouble[err] === radius)
        createCircle(x-1, y-1);
      if(fixAlg[err] === radius)
          createCircle(x-1, y-1);
    } 
    if (err > 0) {
      x--;
      dx += 2;
      err += (-radius << 1) + dx;
    }
  }
}

