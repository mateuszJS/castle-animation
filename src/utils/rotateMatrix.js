export default (matrix) => {
    const newGrid = new Array(_ROW_QUANTITY_);
    matrix.map((elem, i) => {
        const   x = i % _ROW_QUANTITY_,
                y = Math.floor(i / _ROW_QUANTITY_),
                newX = _ROW_QUANTITY_ - y - 1,
                newY = x,
                newPosition = newY * _ROW_QUANTITY_ + newX;
        newGrid[newPosition] = matrix[i];
    })
    return newGrid;
}
