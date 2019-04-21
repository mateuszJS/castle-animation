function getBlockPosition (x, y) {
    if(x >= 0 && x < _ROW_QUANTITY_ && y >= 0 && y < _ROW_QUANTITY_)
        return Math.round(x * _ROW_QUANTITY_ + y);
    return -1;
}

export default getBlockPosition;