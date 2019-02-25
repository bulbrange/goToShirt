const loadingProtocol = (tshirt) => {
  const frontTextures = tshirt.texture.filter(t => t.face === 'front');
  const backTextures = tshirt.texture.filter(t => t.face === 'back');
  [...frontTextures, ...backTextures].map(t => (t.text.length ? t.source : (t.source = `http://${IP}:8888/textures/${t.source}`)));
  return {
    shirtName: tshirt.name,
    baseColor: tshirt.color,
    saving: false,
    actualShirt: tshirt,
    frontTextures,
    backTextures,
  };
};
export const isTextureSelected = textures => textures.some(texture => texture.focus);
export default loadingProtocol;
