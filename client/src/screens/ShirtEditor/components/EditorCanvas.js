import React, { Component } from 'react';
import { View, Image } from 'react-native';
import Draggable from 'react-native-draggable';
import Grid from '../../../styles/grid';
import Colors from '../../../styles/colors';

const front = require('../images/bases/front.png');
const back = require('../images/bases/back.png');

const img = (source, baseColor) => (
  <Image style={{ flex: 1, width: null, height: null }} source={source} tintColor={baseColor} />
);
class Texture extends Component {
  render() {
    return (
      <Draggable
        ref={(texture) => {
          this.texture = texture;
        }}
        renderShape="image"
        imageSource={this.props.source}
        reverse={false}
        renderSize={100}
        renderColor="black"
        offsetX={this.props.posX}
        offsetY={this.props.posY}
        renderText="A"
        pressDrag={() => console.log(this.texture.state.pan.x)}
      />
    );
  }
}
// tintColor="rgba(0, 0, 0, 0.9)"

class EditorCanvas extends Component {
  constructor(props) {
    super(props);
    const {
      switched, baseColor, handleOptionPanel, isOptionPanel, frontTextures,
    } = this.props;
  }

  render() {
    const {
      switched, baseColor, handleOptionPanel, isOptionPanel, frontTextures,
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
        {frontTextures.map((texture, i) => (
          <Texture key={`${i}a`} source={texture.source} posX={texture.posX} posY={texture.posY} />
        ))}
      </View>
    );
  }
}

export default EditorCanvas;
