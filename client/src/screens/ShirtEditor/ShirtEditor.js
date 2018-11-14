import React, { Component } from 'react';
import { View } from 'react-native';
import Grid from '../../styles/grid';
import EditorCanvas from './components/EditorCanvas/EditorCanvas';
import OutputPanel from './components/OutputPanel';

const isTextureSelected = textures => textures.some(texture => texture.focus);

class ShirtEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switched: false,
      baseColor: '#A0A0A0',
      colorPicker: false,
      slider: false,
      imageSlider: true,
      saved: false,
      frontTextures: [],
      backTextures: [],
    };
  }

  handleTextures = async (source, _, posX, posY, renderSize, backgroundColor) => {
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

  handleSwitch = f => async () => {
    const { switched } = this.state;
    await this.setState({
      switched: !switched,
    });
    f();
  };

  handleColorPicker = () => {
    const { colorPicker } = this.state;
    this.setState({
      colorPicker: !colorPicker,
      imageSlider: false,
      slider: false,
    });
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

  handleSlider = () => {
    const { slider } = this.state;
    this.setState({
      slider: !slider,
      imageSlider: false,
      colorPicker: false,
    });
  };

  handleRotation = () => {
    console.log('BINGO');
  };

  handleCarrousel = () => {
    const { imageSlider } = this.state;
    this.setState({
      imageSlider: !imageSlider,
      colorPicker: false,
      slider: false,
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

  handlerMock = () => console.log('Button Working');

  render() {
    const {
      switched,
      baseColor,
      colorPicker,
      slider,
      imageSlider,
      frontTextures,
      backTextures,
      saved,
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
              handleSwitch: this.handleSwitch,
              handleColorPicker: this.handleColorPicker,
              handleCarrousel: this.handleCarrousel,
              handleSlider: this.handleSlider,
            }}
          />
        </View>
        <View style={[Grid.row, Grid.p0, { flex: 0.3 }]}>
          <OutputPanel
            colorPicker={colorPicker}
            imageSlider={imageSlider}
            slider={slider}
            handleBaseColor={this.handleBaseColor}
            handleTextures={this.handleTextures}
          />
        </View>
      </View>
    );
  }
}

export default ShirtEditor;
