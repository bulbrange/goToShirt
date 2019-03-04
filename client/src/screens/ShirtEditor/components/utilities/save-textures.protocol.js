import IP from '../../../../ip';
const saveTextures = async (addTexture, shirt, textures, side) => {
  await Promise.all(
    textures.map(async (t) => {
      let file = Date.now();
      await fetch(`http://${IP}:8080/save`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: t.source, file: file })
      }).then(data => console.log(data))
      const texture = {
        source: `http://${IP}:8080/textures/${file}.png`,
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
  ).catch(e => console.log('ERROR', e));
};

export default saveTextures;
