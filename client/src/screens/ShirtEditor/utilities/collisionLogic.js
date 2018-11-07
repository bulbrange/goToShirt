const offset = (renderSize, width, height) => {
  const maxXX = width - renderSize * 2; // render 80 ---> 200
  console.log('WIDTH @ OFFSET: ', width);
  console.log('RENDERSIZE: ', renderSize);
  console.log('MAXX: ', maxXX);
  if (renderSize === 80) return { x: { maxX: maxXX, minX: 72 }, y: { maxY: 310, minY: 70 } };
  if (renderSize === 110) return { x: { maxX: 165, minX: 66 }, y: { maxY: 260, minY: 70 } };
  return { x: { maxX: 88, minX: 65 }, y: { maxY: 180, minY: 70 } };
};

const collisionX = (posX, renderSize, width, height) => {
  const { maxX, minX } = offset(renderSize, width, height).x;

  if (posX > maxX) return maxX;
  if (posX < minX) return minX;
  return posX;
};

const collisionY = (posY, renderSize, width, height) => {
  const { maxY, minY } = offset(renderSize, width, height).y;

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
