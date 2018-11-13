import React, { Component } from 'react';
import { View, Animated, Easing } from 'react-native';
import Grid from '../../styles/grid';
import EditorCanvas from './components/EditorCanvas';
import OptionPanel from './components/OptionPanel';
import OutputPanel from './components/OutputPanel';

const isTextureSelected = (frontTextures, backTextures) => frontTextures.some(texture => texture.focus) || backTextures.some(texture => texture.focus);

class ShirtEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switched: false,
      baseColor: '#A0A0A0',
      colorPicker: false,
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

  handleRemoveTexture = async (id) => {
    const { frontTextures, backTextures } = this.state;
    await this.setState({
      frontTextures: frontTextures.filter(texture => texture.id !== id),
      backTextures: backTextures.filter(texture => texture.id !== id),
    });
  };

  handleSwitch = f => async () => {
    const { switched } = this.state;
    await this.setState({
      switched: !switched,
    });
    f();
  };

  handleBaseColor = (baseColor) => {
    const { frontTextures, backTextures } = this.state;
    if (isTextureSelected(frontTextures, backTextures)) {
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

  handleColorPicker = () => {
    const { colorPicker } = this.state;
    this.setState({
      colorPicker: !colorPicker,
      imageSlider: false,
    });
  };

  handleImageSlider = () => {
    const { imageSlider } = this.state;
    this.setState({
      imageSlider: !imageSlider,
      colorPicker: false,
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
      imageSlider,
      frontTextures,
      backTextures,
      saved,
    } = this.state;
    return (
      <View style={[Grid.grid]}>
        <View style={[Grid.row, Grid.p0, { flex: 0.7 }]}>
          <EditorCanvas
            states={{ switched, baseColor, frontTextures, backTextures }}
            handlers={{ handleSwitch: this.handleSwitch, handleRemoveTexture: this.handleRemoveTexture }}
            // optionpanelHandlers
            handleColorPicker={this.handleColorPicker}
            handleImageSlider={this.handleImageSlider}
          />
        </View>
        <View style={[Grid.row, Grid.p0, { flex: 0.3 }]}>
          <OutputPanel
            colorPicker={colorPicker}
            imageSlider={imageSlider}
            handleBaseColor={this.handleBaseColor}
            handleTextures={this.handleTextures}
          />
        </View>
      </View>
    );
  }
}

export default ShirtEditor;
