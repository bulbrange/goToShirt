import React from 'react';
import {
  View, Image, StyleSheet, TouchableOpacity,
} from 'react-native';
import IconButton from '../../../components/IconButton';
import Grid from '../../../styles/grid';
import { Colors } from '../../../styles/colors';
import Draggable from './Draggable';

const styles = StyleSheet.create({
  cogButton: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 5,
    right: 10,
  },
  shadowBackground: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  focusOn: {
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 5,
  },
});

const front = require('../images/bases/front.png');
const back = require('../images/bases/back.png');
const shadowfront = require('../images/bases/shadowfront.png');
const shadowback = require('../images/bases/shadowback.png');

const backgroundImg = (source, shadow, baseColor, handleTextureFocusLost) => (
  <TouchableOpacity style={{ flex: 1, zIndex: -1 }} onPress={() => handleTextureFocusLost()}>
    <Image style={{ flex: 1, width: null, height: null }} source={source} tintColor={baseColor} />
    <Image style={[styles.shadowBackground, {}]} source={shadow} />
  </TouchableOpacity>
);

const EditorCanvas = ({
  switched,
  baseColor,
  handleOptionPanel,
  frontTextures,
  updatePosition,
  backTextures,
  isOptionPanel,
  handleSwitch,
  handleTextureFocusLost,
}) => {
  const buttonName = !isOptionPanel ? 'cog' : 'cogs';
  const textures = !switched ? frontTextures : backTextures;
  return (
    <View style={[Grid.col12, Colors.white, {}]}>
      {switched
        ? backgroundImg(back, shadowback, baseColor, handleTextureFocusLost)
        : backgroundImg(front, shadowfront, baseColor, handleTextureFocusLost)}
      <View style={styles.cogButton}>
        <IconButton name={buttonName} size={40} handler={handleOptionPanel} />
      </View>
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
          updatePosition={updatePosition}
          handleSwitch={handleSwitch}
          backgroundColor={texture.backgroundColor}
        />
      ))}
    </View>
  );
};

export default EditorCanvas;
