import React, { Component } from 'react';
import {
  View, Image, StyleSheet, Dimensions,
} from 'react-native';
import IconButton from '../../../components/IconButton';
import Grid from '../../../styles/grid';
import Colors from '../../../styles/colors';
import Texture from './Texture';

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 5,
    right: 10,
  },
});

const front = require('../images/bases/front.png');
const back = require('../images/bases/back.png');
const shadowfront = require('../images/bases/shadowfront.png');
const shadowback = require('../images/bases/shadowback.png');
//     <Image style={{ flex: 1, width: null, height: null }} source={source} tintColor="white" />

const img = (source, shadow, baseColor) => (
  <View style={{ flex: 1 }}>
    <Image style={{ flex: 1, width: null, height: null }} source={source} tintColor={baseColor} />
    <Image
      style={{
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
      }}
      source={shadow}
    />
  </View>
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
    } = this.props;

    // const textures = !switched ? frontTextures : backTextures;
    const buttonName = !isOptionPanel ? 'cog' : 'cogs';

    return (
      <View style={[Grid.col12, Colors.white]}>
        {switched ? img(back, shadowback, baseColor) : img(front, shadowfront, baseColor)}
        <View style={styles.buttonStyle}>
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
              renderSize={texture.renderSize}
              updatePosition={updatePosition}
              handleSwitch={handleSwitch}
            />
          ))
          : backTextures.map((texture, i) => (
            <Texture
              key={i * 2}
              id={texture.id}
              source={texture.source}
              posX={texture.posX}
              posY={texture.posY}
              renderSize={texture.renderSize}
              updatePosition={updatePosition}
              handleSwitch={handleSwitch}
            />
          ))}
      </View>
    );
  }
}

export default EditorCanvas;
