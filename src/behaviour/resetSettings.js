export default (blocks, strength = 0) => {
    const reset = (block) => {
        block.strength = strength;
        block.destination = 0;
    }
    blocks.forEach(reset);
}