const offset = (renderSize) => {
  if (renderSize >= 80 && renderSize < 110) return { x: { maxX: 225, minX: 85 }, y: { maxY: 310, minY: 70 } };
  if (renderSize >= 110 && renderSize < 180) return { x: { maxX: 200, minX: 85 }, y: { maxY: 280, minY: 70 } };
  return { x: { maxX: 100, minX: 85 }, y: { maxY: 180, minY: 70 } };
};

const collisionX = (posX, renderSize) => {
  const { maxX, minX } = offset(renderSize).x;

  if (posX > maxX) return maxX;
  if (posX < minX) return minX;
  return posX;
};

const collisionY = (posY, renderSize) => {
  const { maxY, minY } = offset(renderSize).y;

  if (posY > maxY) return maxY;
  if (posY < minY) return minY;
  return posY;
};

const shouldRefresh = (posX, posY, renderSize, width, height) => {
  const { maxX, minX } = offset(renderSize, width, height).x;
  const { maxY, minY } = offset(renderSize, width, height).y;

  return posX > maxX || posX < minX || posY > maxY || posY < minY;
};

export { collisionX, collisionY, shouldRefresh };
