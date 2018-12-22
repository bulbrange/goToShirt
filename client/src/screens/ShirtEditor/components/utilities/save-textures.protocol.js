const saveTextures = async (addTexture, shirt, textures, side) => {
  await Promise.all(
    textures.map((t) => {
      const texture = {
        source: `${t.source}`,
        posX: t.posX,
        posY: t.posY,
        face: side,
        tshirtId: shirt.id,
        renderSize: t.renderSize,
        backgroundColor: t.backgroundColor,
        rotate: t.rotate,
        text: t.text,
        tintColor: t.tintColor,
      };
      return addTexture(texture);
    }),
  )
    .then(res => console.log(`${side.toUpperCase()} saved: `, res))
    .catch(e => console.log('ERROR', e));
};

export default saveTextures;
