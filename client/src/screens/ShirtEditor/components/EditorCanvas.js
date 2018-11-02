import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
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
        pressDrag={() => {
          console.log(this.texture.state._value.x, this.texture.state._value.y);
          this.props.updateFrontXY(
            this.props.source,
            this.texture.state._value.x,
            this.texture.state._value.y,
          );
        }}
      />
    );
  }
}
// console.log('TEXTUREEEeeeee: ', this.texture.state.pan.x._value)
/*
this.props.updateFrontXY(
          this.props.source,
          this.texture.state._value.x,
          this.texture.state._value.y,
        )

*/
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
