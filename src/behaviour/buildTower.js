import circleForm from '../utils/circleForm';

const seclvl = 1500;
export default (blocks, blocksUnsorted, time, power) => {
    const modBlock = (block) =>
        block.destination = block.sky - 200 + power * 30;
    
    if(time % 6 === 0) {
        circleForm(blocks,
            power,
            {x: Math.floor(_ROW_QUANTITY_/2),
            y: Math.floor(_ROW_QUANTITY_/2)},
            modBlock
        );
        power++;
    }

    const blockSetY = (block, idx) => {
        block.y += ((block.destination || block.sky) - block.y) * 0.1;
        block.alpha += (1 - block.alpha) * 0.1;
        if(Math.abs(block.alpha - 1) < 0.1)
            block.alpha = 1;
    }

    const modifyY = (block, idx) =>
        block.y += (block.destination + Math.sin(time/10 + idx/75) * 40 - block.y) * 0.05;

    const blockAnimInit = (block, idx) => {
        if(time <= seclvl) {
            block.y += ((block.destination || block.sky) - block.y) * 0.1;
        } else {
            block.y += (block.destination + Math.sin(time/10 + idx/75) * 40 - block.y) * 0.05;
            let newAlpha = (1 + Math.sin(time/40 + idx/80)) * (time - seclvl)/100;
            block.alpha = newAlpha > 1 ? newAlpha : 1;
        }
    }
    const blockAnim = (block, idx) => {
        if(time <= seclvl) {
            block.y += ((block.destination || block.sky) - block.y) * 0.1;
        } else {
            block.y += (block.destination + Math.sin(time/10 + idx/75) * 40 - block.y) * 0.05;
            let newAlpha = 1 + Math.sin(time/40 + idx/80);
            block.alpha = newAlpha > 1 ? newAlpha : 1;
        }
    }

    if(time < seclvl) {
        blocks.map(blockSetY);
    } else if(time < seclvl + 100) {
        blocksUnsorted.map(modifyY);
        blocks.map(blockAnimInit);
    } else {
        blocksUnsorted.map(modifyY);
        blocks.map(blockAnim);
    }
    return power;
}