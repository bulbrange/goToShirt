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
      isOptionPanel,
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
      isOptionPanel,
      frontTextures,
      updateFrontXY,
      backTextures,
    } = this.props;
    const layout = isOptionPanel ? Grid.col10 : Grid.col12;
    return (
      <View style={[layout, Colors.white]}>
        {switched ? img(back, baseColor) : img(front, baseColor)}
        <Draggable
          reverse={false}
          renderSize={35}
          renderColor={Colors.primary.backgroundColor}
          offsetX={-120}
          offsetY={50}
          pressDrag={() => handleOptionPanel()}
        />
        {!switched
          ? frontTextures.map((texture, i) => (
            <Texture
              key={`${i}a`}
              source={texture.source}
              posX={texture.posX}
              posY={texture.posY}
              updateFrontXY={updateFrontXY}
            />
          ))
          : backTextures.map((texture, i) => (
            <Texture
              key={i * 2}
              source={texture.source}
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
