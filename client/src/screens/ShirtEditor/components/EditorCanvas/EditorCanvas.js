import React, { Component } from 'react';
import { View } from 'react-native';
import Grid from '../../../../styles/grid';
import { Colors } from '../../../../styles/colors';
import backgroundImg from './components/backgroundImg';
import TexturePlayground from './components/TexturePlayground';

const front = require('./images/bases/front.png');
const back = require('./images/bases/back.png');
const shadowfront = require('./images/bases/shadowfront.png');
const shadowback = require('./images/bases/shadowback.png');

class EditorCanvas extends Component {
  updatePosition = (_, posX, posY, id) => {
    const { states } = this.props;
    [...states.frontTextures, ...states.backTextures].map((texture) => {
      if (texture.id === id) {
        texture.posX = posX;
        texture.posY = posY;
        texture.focus = true;
      } else {
        texture.focus = false;
      }
      return texture;
    });
    states.ShirtEditor.setState({
      frontTextures: states.frontTextures,
      backTextures: states.backTextures,
    });
  };

  render() {
    const { states, handlers } = this.props;
    const textures = !states.switched ? states.frontTextures : states.backTextures;
    return (
      <View style={[Grid.col12, Colors.light2, {}]}>
        {states.switched
          ? backgroundImg(back, shadowback, states.baseColor, handlers.handleTextureFocusLost)
          : backgroundImg(front, shadowfront, states.baseColor, handlers.handleTextureFocusLost)}
        <TexturePlayground
          textures={textures}
          handlers={{
            handleSwitch: handlers.handleSwitch,
            updatePosition: this.updatePosition,
          }}
        />
      </View>
    );
  }
}

export default EditorCanvas;
