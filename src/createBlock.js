export default (Sprite, texture, blockSize, blockAngle, id) => {
  const col = id % _ROW_QUANTITY_,
        row = Math.floor(id / _ROW_QUANTITY_),
        offsetX = _ROW_QUANTITY_ * (blockSize * 0.6) + 20 * 0.36 * blockSize + blockSize/2,
        posX = offsetX - (col * -(0.36 * blockSize) + row * (blockSize * 0.6) + 20 * 0.36 * blockSize + blockSize/2),
        posY = col * -(0.25 * blockSize) + row * -(0.14 * blockSize),
        sprite = new Sprite(texture),
        scale = blockSize/ sprite.width;

  sprite.scale.set(scale);
  sprite.anchor.set(0.5, 0);
  sprite.x = posX;
  sprite.y = posY;
  sprite.sky = posY;
  sprite.strength = 0;
  sprite.destination = 0;
  sprite.type = 0;

  //visual initialize
  sprite.alpha = 0;
  sprite.y += 300;

  return sprite;
}