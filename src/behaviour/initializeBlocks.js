const setPos = (time, endTime, element) => {
    element.y += (element.sky - element.y) * 0.1;
    element.alpha = element.alpha >= 0.99 ? 1 : element.alpha + 0.05;
}

let counter = 0;
export default (blocks, time, timeEnd) => {
    for(let i = 0; i < counter; i++) {
        const block = blocks[i];
        setPos(time, timeEnd, block);
    }
    counter += 4;
    if(counter > blocks.length)
        counter = blocks.length;

}