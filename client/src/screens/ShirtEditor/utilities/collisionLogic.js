const offset = (renderSize) => {
  if (renderSize === 80) return { x: { maxX: 200, minX: 72 }, y: { maxY: 310, minY: 70 } };
  if (renderSize === 110) return { x: { maxX: 165, minX: 66 }, y: { maxY: 260, minY: 70 } };
  return { x: { maxX: 88, minX: 55 }, y: { maxY: 180, minY: 70 } };
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

const shouldRefresh = (posX, posY, renderSize) => {
  const { maxX, minX } = offset(renderSize).x;
  const { maxY, minY } = offset(renderSize).y;

  return posX > maxX || posX < minX || posY > maxY || posY < minY;
};

export { collisionX, collisionY, shouldRefresh };
