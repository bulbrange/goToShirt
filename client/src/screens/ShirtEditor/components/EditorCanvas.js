import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import IconButton from '../../../components/IconButton';
import Grid from '../../../styles/grid';
import Colors from '../../../styles/colors';
import Texture from './Texture';

const front = require('../images/bases/front.png');
const back = require('../images/bases/back.png');

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 5,
    right: 10,
  },
});

const img = (source, baseColor) => (
  <Image style={{ flex: 1, width: null, height: null }} source={source} tintColor={baseColor} />
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
      updateFrontXY,
      isOptionPanel,
      handleSwitch,
    } = this.props;
  }

  render() {
    const {
      switched,
      baseColor,
      handleOptionPanel,
      frontTextures,
      updateFrontXY,
      backTextures,
      isOptionPanel,
      handleSwitch,
    } = this.props;
    const textures = !switched ? frontTextures : backTextures;
    const buttonName = !isOptionPanel ? 'cog' : 'cogs';
    return (
      <View style={[Grid.col12, Colors.white]}>
        {switched ? img(back, baseColor) : img(front, baseColor)}
        <View style={styles.buttonStyle}>
          <IconButton name={buttonName} size={40} handler={handleOptionPanel} />
        </View>
        {textures.map((texture, i) => (
          <Texture
            key={i}
            id={i}
            source={texture.source}
            renderSize={texture.renderSize}
            posX={texture.posX}
            posY={texture.posY}
            updateFrontXY={updateFrontXY}
            handleSwitch={handleSwitch}
          />
        ))}
      </View>
    );
  }
}

export default EditorCanvas;
