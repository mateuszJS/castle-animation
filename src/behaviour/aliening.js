import addStrength from '../utils/addStrength';

let angle = 0;
export default (blocks, time) => {
    if(time % 4 === 0) {
        angle += 0.1;

        let xx = Math.sin(angle) * 10 + 10,
        yy = -Math.cos(angle) * 10 + 10;

        addStrength(blocks,
            1,
            {x: Math.round(xx),
            y: Math.round(yy)},
            -10,
            true
        );

       

        const angle2 = angle + 0.1;
        xx = Math.sin(-angle) * 8 + 10;
        yy = -Math.cos(-angle) * 8 + 10;

        addStrength(blocks,
            1,
            {x: Math.round(xx),
            y: Math.round(yy)},
            -10,
            true
        );
    }

  

  const calcNewY = (block, idx) => {
    block.y += block.strength;
    if(block.y < block.sky) {
      block.strength += 0.1;
    } else {
      block.strength -= 0.1;
    }
    block.strength *= 0.99;
    if(block.y >= block.sky) {
      block.strength = 0;
      block.y = block.sky;
    }


    // if(block.strength) {
    //     block.strength -= 0.01;
    //     if(block.y >= block.sky) {
    //         block.y = block.sky;
    //         block.strength = 0;
    //     }
    //     block.y -= block.strength;
    // }
  }

  blocks.map(calcNewY);
}

function ptInTriangle(p, p0, p1, p2) {
    var A = 1/2 * (-p1.y * p2.x + p0.y * (-p1.x + p2.x) + p0.x * (p1.y - p2.y) + p1.x * p2.y);
    var sign = A < 0 ? -1 : 1;
    var s = (p0.y * p2.x - p0.x * p2.y + (p2.y - p0.y) * p.x + (p0.x - p2.x) * p.y) * sign;
    var t = (p0.x * p1.y - p0.y * p1.x + (p0.y - p1.y) * p.x + (p1.x - p0.x) * p.y) * sign;
    
    return s > 0 && t > 0 && (s + t) < 2 * A * sign;
}