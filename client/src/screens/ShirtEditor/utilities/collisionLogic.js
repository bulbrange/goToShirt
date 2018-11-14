const collision = (pos, renderSize, collisionSize) => {
  const maxPos = collisionSize - renderSize;

  if (pos > maxPos) return maxPos;
  if (pos < 0) return 0;
  return pos;
};

const shouldRefresh = (posX, posY, renderSize, width, height) => {
  const maxX = collision(posX, renderSize, width);
  const maxY = collision(posY, renderSize, height);

  return posX > maxX || posX < 0 || posY > maxY || posY < 0;
};

export { collision, shouldRefresh };
