import React, { Component } from 'react';
import { View, Image } from 'react-native';
import Draggable from 'react-native-draggable';
import Grid from '../../../styles/grid';
import Colors from '../../../styles/colors';
import Texture from './Texture';

const front = require('../images/bases/front.png');
const back = require('../images/bases/back.png');

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
    } = this.props;
    const textures = !switched ? frontTextures : backTextures;
    return (
      <View style={[Grid.col12, Colors.white]}>
        {switched ? img(back, baseColor) : img(front, baseColor)}
        <Draggable
          reverse={false}
          renderSize={35}
          renderColor={Colors.primary.backgroundColor}
          offsetX={-120}
          offsetY={50}
          pressDrag={() => handleOptionPanel()}
          pressDragRelease={() => handleOptionPanel()}
        />
        {textures.map((texture, i) => (
          <Texture
            key={`${i}a`}
            source={texture.source}
            renderSize={texture.renderSize}
            posX={texture.posX}
            posY={texture.posY}
            updateFrontXY={updateFrontXY}
          />
        ))}
      </View>
    );
  }
}

export default EditorCanvas;
