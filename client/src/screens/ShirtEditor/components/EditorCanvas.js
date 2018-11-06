import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
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

const img = (source, baseColor) => (
  <Image style={{ flex: 1, width: null, height: null }} source={source} tintColor={baseColor} />
);

class EditorCanvas extends Component {
  constructor(props) {
    super(props);
    const {
      baseColor,
      handleOptionPanel,
      textures,
      isOptionPanel,
      handleSwitch,
      background,
    } = this.props;
  }

  render() {
    const {
      baseColor,
      handleOptionPanel,
      textures,
      updateHandler,
      isOptionPanel,
      handleSwitch,
      background,
    } = this.props;
    // const textures = !switched ? frontTextures : backTextures;
    const buttonName = !isOptionPanel ? 'cog' : 'cogs';
    return (
      <View style={[Grid.col12, Colors.white]}>
        {img(background, baseColor)}
        <View style={styles.buttonStyle}>
          <IconButton name={buttonName} size={40} handler={handleOptionPanel} />
        </View>
        {textures.map((texture, i) => (
          <Texture
            key={i}
            id={texture.id}
            source={texture.source}
            renderSize={texture.renderSize}
            posX={texture.posX}
            posY={texture.posY}
            updateHandler={updateHandler}
            handleSwitch={handleSwitch}
          />
        ))}
      </View>
    );
  }
}

export default EditorCanvas;
