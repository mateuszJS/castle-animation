import faceForm from '../maps/face';

export default (blocks, time, start) => {
    time -= start;
    if(time === 1) {
        initializeFace(blocks);
    }
    blocks.map(calcNewY);
}


const calcNewY = (block, idx) => {
    if(block.destination) {
        const move = (block.destination - block.y) * 0.1;
        if(Math.abs(move) < 0.01) {
            block.y = block.destination;
            block.destination = undefined;
        } else {
            block.y += move;
        }
    }
}


const initializeFace = (blocks) => {
    blocks.map( (block, idx) => {
        let level = faceForm[idx].charCodeAt(0),
            factor = 30,
            add = 200;
        if(level > 109) {
            factor = 15;
            add = 10;
        } //else if()
        block.destination = ((block.sky + add) - (level - 97) * factor);
        if(level >= 109) {
            if(idx % 21 < 11) block.alpha = 1.8;
            if(idx % 21 === 8 && Math.floor(idx / 21) > 5 && Math.floor(idx / 21) < 15) block.alpha = 5;
        }
        else block.alpha = 1;
    });
};