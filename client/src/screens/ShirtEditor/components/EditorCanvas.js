import React, { Component } from 'react';
import {
  View, Image, StyleSheet, TouchableOpacity,
} from 'react-native';
import IconButton from '../../../components/IconButton';
import Grid from '../../../styles/grid';
import Colors from '../../../styles/colors';
import Texture from './Texture';

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

class EditorCanvas extends Component {
  constructor(props) {
    super(props);
    const {
      switched,
      baseColor,
      handleOptionPanel,
      frontTextures,
      backTextures,
      updatePosition,
      textures,
      isOptionPanel,
      handleSwitch,
      background,
    } = this.props;
  }

  render() {
    const {
      switched,
      baseColor,
      handleOptionPanel,
      frontTextures,
      updatePosition,
      backTextures,
      isOptionPanel,
      handleSwitch,
      handleTextureFocusLost,
    } = this.props;

    // const textures = !switched ? frontTextures : backTextures;
    const buttonName = !isOptionPanel ? 'cog' : 'cogs';
    return (
      <View style={[Grid.col12, Colors.white, { }]} >
        {switched
          ? backgroundImg(back, shadowback, baseColor, handleTextureFocusLost)
          : backgroundImg(front, shadowfront, baseColor, handleTextureFocusLost)}
        <View style={styles.cogButton}>
          <IconButton name={buttonName} size={40} handler={handleOptionPanel} />
        </View>
        {!switched
          ? frontTextures.map((texture, i) => (
            <Texture
              key={`${i}a`}
              id={texture.id}
              source={texture.source}
              posX={texture.posX}
              posY={texture.posY}
              focus={texture.focus}
              renderSize={texture.renderSize}
              updatePosition={updatePosition}
              handleSwitch={handleSwitch}
              backgroundColor={texture.backgroundColor}
            />
          ))
          : backTextures.map((texture, i) => (
            <Texture
              key={i * 2}
              id={texture.id}
              source={texture.source}
              posX={texture.posX}
              posY={texture.posY}
              focus={texture.focus}
              renderSize={texture.renderSize}
              updatePosition={updatePosition}
              handleSwitch={handleSwitch}
              backgroundColor={texture.backgroundColor}
            />
          ))}
      </View>
    );
  }
}

export default EditorCanvas;
