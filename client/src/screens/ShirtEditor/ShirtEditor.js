import React, { Component } from 'react';
import { View } from 'react-native';
import Grid from '../../styles/grid';
import EditorCanvas from './components/EditorCanvas/EditorCanvas';
import OutputPanel from './components/OutputPanel/OutputPanel';

const isTextureSelected = textures => textures.some(texture => texture.focus);

class ShirtEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switched: false,
      baseColor: '#CC2222',
      saved: false,
      frontTextures: [],
      backTextures: [],
    };
  }

  handleTextures = async (source, _, posX, posY, renderSize, backgroundColor, text = '') => {
    const { frontTextures, backTextures, switched } = this.state;
    const id = Date.now();
    const newTexture = {
      source,
      posX,
      posY,
      renderSize,
      id,
      backgroundColor,
      focus: false,
      rotate: '0deg',
      text,
    };
    if (!switched) {
      await this.setState({
        frontTextures: [...frontTextures, newTexture],
      });
    } else {
      await this.setState({
        backTextures: [...backTextures, newTexture],
      });
    }
  };

  handleSwitch = async () => {
    const { switched } = this.state;
    await this.setState({
      switched: !switched,
    });
    this.handleTextureFocusLost();
  };

  handleBaseColor = (baseColor) => {
    const { frontTextures, backTextures } = this.state;
    if (isTextureSelected([...frontTextures, ...backTextures])) {
      [...frontTextures, ...backTextures].map(
        texture => (texture.focus ? (texture.backgroundColor = baseColor) : texture),
      );
      this.setState({
        frontTextures,
        backTextures,
      });
    } else {
      this.setState({
        baseColor,
      });
    }
  };

  handleRotation = (val) => {
    const { frontTextures, backTextures } = this.state;
    [...frontTextures, ...backTextures].map((texture) => {
      if (texture.focus) texture.rotate = `${val}deg`;
      return texture;
    });
    this.setState({
      frontTextures,
      backTextures,
    });
  };

  handlerSave = async () => {
    const { saved } = this.state;
    await this.setState({
      saved: !saved,
    });
    setTimeout(() => {
      console.log(this.state.saved);
    }, 2000);
  };

  handleTextureFocusLost = async () => {
    const { frontTextures, backTextures } = this.state;
    await [...frontTextures, ...backTextures].map(texture => (texture.focus = false));
    this.setState({
      frontTextures,
      backTextures,
    });
  };

  handlerMock = () => console.log('Button Working');

  render() {
    const {
      switched, baseColor, frontTextures, backTextures, saved,
    } = this.state;
    return (
      <View style={[Grid.grid]}>
        <View style={[Grid.row, Grid.p0, { flex: 0.7 }]}>
          <EditorCanvas
            states={{
              switched,
              baseColor,
              frontTextures,
              backTextures,
            }}
            handlers={{
              handleTextureFocusLost: this.handleTextureFocusLost,
              handleSwitch: this.handleSwitch,
            }}
          />
        </View>
        <View style={[Grid.row, Grid.p0, { flex: 0.3, zIndex: 1 }]}>
          <OutputPanel
            states={{
              switched,
              baseColor,
              frontTextures,
              backTextures,
            }}
            handlers={{
              handleTextures: this.handleTextures,
              handleRotation: this.handleRotation,
              handleBaseColor: this.handleBaseColor,
              handleSwitch: this.handleSwitch,
              handleColorPicker: this.handleColorPicker,
              handleCarrousel: this.handleCarrousel,
              handleSlider: this.handleSlider,
            }}
          />
        </View>
      </View>
    );
  }
}

export default ShirtEditor;
