import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Draggable from './Draggable';

const styles = StyleSheet.create({
  collisionBox: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'black',
    position: 'absolute',
  },
});
const { width, height } = Dimensions.get('window');
const collisionBoxWidth = width / 1.7;
const collisionBoxHeight = height / 2;

const TexturePlayground = ({ textures, handlers }) => (
  <View
    style={[
      styles.collisionBox,
      {
        width: collisionBoxWidth,
        height: collisionBoxHeight,
        top: height / 9,
      },
    ]}
  >
    {textures.map(texture => (
      <Draggable
        key={Math.floor(Math.random() * 1000000)}
        id={texture.id}
        source={texture.source}
        posX={texture.posX}
        posY={texture.posY}
        focus={texture.focus}
        renderSizeX={texture.renderSize}
        renderSizeY={texture.renderSize}
        updatePosition={handlers.updatePosition}
        handleSwitch={handlers.handleSwitch}
        backgroundColor={texture.backgroundColor}
        handleRemoveTexture={handlers.handleRemoveTexture}
        collisionSize={{ width: collisionBoxWidth, height: collisionBoxHeight }}
      />
    ))}
  </View>
);
export default TexturePlayground;
