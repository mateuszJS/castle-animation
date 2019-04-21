import castleForm from '../maps/castle';

const buildCastle = (time, counter, start, blockSprites, flag, blocks) => {
    time -= start;
    if(time === 1) {
        initializeFirstLevel(blocks);
    }
    else if(time === 60) {
        initializeFlagDisc(flag.disk, blocks, blockSprites);
    }
    else if(time > 100 && time <= 100 + _QUANTITY_/2) {
        const factor = (time - 101) * 2,
            idx = _QUANTITY_ - 1 - factor;
        let block = blockSprites.children[idx];
        block.destination = ((block.sky + 200) - (block.type - 97) * 18);
        block = blockSprites.children[idx-1];
        if(block) {
            block.destination = ((block.sky + 200) - (block.type - 97) * 18);
        }
        if(flag.disk.y >= blocks[Math.floor(_QUANTITY_/2)].y + blockSprites.y && !flag.pole.visible) {
            initializeFlagPole(flag);
        }
    }
    if(time < 300) {
        if(flag.disk.strength !== 0) {
            flag.disk.y += flag.disk.strength;
            flag.disk.strength += 0.1;
        } else if(flag.pole.height < 100) {
            flag.pole.height += (100 - flag.pole.height) * 0.05;
            flag.point.y = flag.pole.y - flag.pole.height;
            if(Math.round(flag.pole.height) >= 98) {
                flag.pole.height = 100;
            }
            if(flag.pole.height === 100) {
                flag.canvas.play();
                flag.canvas.x = flag.disk.x + 3;
                flag.canvas.y = flag.point.y - 20;
                flag.canvas.visible = true;
            }
        }
        if(flag.canvas.width <= 100 && flag.canvas.visible) {
            flag.canvas.width += 3; 
        }
    }

    const calcNewY = (block, idx) => {
        if(block.type === 97) {
            const move = Math.cos(counter + idx/100) * 30 + block.destination; 
            block.y -= (block.y - move)/10;
        } 
        else if(block.destination) {
            if(block.y > block.destination) {
                block.strength -= 0.4;
                if(block.strength < -5) 
                    block.strength = -5;
            } else if(block.y < block.destination) {
                block.strength += 0.4;
                const subtraction = block.destination - block.y;
                if(subtraction < block.strength * 40) {// 40 - count of frames
                    block.strength = subtraction/20;
                    if(subtraction < 0.02) {
                        block.strength = 0;
                        block.y = block.destination;
                        block.destination = undefined;
                    }
                }
            }
            block.y += block.strength;
        }
        
    }
    blocks.map(calcNewY);
}

const initializeFirstLevel = (blocks) => {
    blocks.map( (block, idx) => {
        let level = castleForm[idx].charCodeAt(0);
        block.type = level;
        if(level > 116)
            block.alpha = 1.7;
        else if(block.type === 97)
            block.alpha = 0.5;
        else
            block.alpha = 1;

        if(level < 106) level = 97;
        else if(level < 115) level = 106;
        else if(level < 120) level = 115;
        else level = 120;
        
        block.destination = ((block.sky + 200) - (level - 97) * 18);
        block.strength = 0;
    });
};

const initializeFlagDisc = (disk, blocks, blockSprites) => {
    disk.strength = -4;
    disk.visible = true;
    disk.gotoAndPlay(0);
    const centerBlock = blocks[Math.floor(_QUANTITY_/2)];
    disk.x = centerBlock.x + blockSprites.x;
    disk.y = centerBlock.y + blockSprites.y;
}

const initializeFlagPole = (flag) => {
    flag.disk.strength = 0;
    flag.disk.gotoAndStop(3);
    flag.pole.height = 0;
    flag.pole.x = flag.disk.x;
    flag.pole.y = flag.disk.y - 3;
    flag.pole.visible = true;
    flag.point.x = flag.disk.x;
    flag.point.y = flag.disk.y;
    flag.point.visible = true;
    flag.canvas.visible = false;
}

export default buildCastle;