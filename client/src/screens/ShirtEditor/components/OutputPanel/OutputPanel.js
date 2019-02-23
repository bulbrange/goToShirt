import React, { Component } from 'react';
import { View } from 'react-native';
import Grid from '../../../../styles/grid';
import { Colors } from '../../../../styles/colors';
import option from './components/selectedOption';
import panel from './components/displayPanel';
import { isTextureSelected } from '../ShirtEditor';

const generalButtons = ['exchange-alt', 'palette', 'film', 'align-center', 'tshirt', 'save'];
const textureButtons = ['times-circle', 'plus', 'minus', 'tint', 'undo'];

class OutputPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorPicker: false,
      slider: false,
      imageSlider: false,
      text: false,
      tint: false,
    };
  }

  triggerComponent = (active) => {
    const {
      text, imageSlider, colorPicker, slider, tint,
    } = this.state;
    this.setState({
      text: active === 'text' ? !text : false,
      imageSlider: active === 'imageSlider' ? !imageSlider : false,
      colorPicker: active === 'colorPicker' ? !colorPicker : false,
      slider: active === 'slider' ? !slider : false,
      tint: active === 'tint' ? !tint : false,
    });
  };

  handleDecreaseTexture = () => {
    const { states } = this.props;
    [...states.frontTextures, ...states.backTextures].map((texture) => {
      if (texture.focus && (texture.renderSize > 80 || texture.text.length)) texture.renderSize -= 10;
      return texture;
    });
    states.ShirtEditor.setState({
      frontTextures: states.frontTextures,
      backTextures: states.backTextures,
    });
  };

  handleIncreaseTexture = () => {
    const { states } = this.props;
    [...states.frontTextures, ...states.backTextures].map((texture) => {
      if (texture.focus && texture.renderSize < 200) texture.renderSize += 10;
      return texture;
    });
    states.ShirtEditor.setState({
      frontTextures: states.frontTextures,
      backTextures: states.backTextures,
    });
  };

  handleRemoveTexture = async () => {
    const { states } = this.props;
    await states.ShirtEditor.setState({
      frontTextures: states.frontTextures.filter(texture => !texture.focus),
      backTextures: states.backTextures.filter(texture => !texture.focus),
    });
  };

  render() {
    const { handlers, states } = this.props;
    const {
      colorPicker, imageSlider, slider, text, tint,
    } = this.state;

    const textures = [...states.frontTextures, ...states.backTextures];
    const generalHandlers = [
      handlers.handleSwitch,
      () => this.triggerComponent('colorPicker'),
      () => this.triggerComponent('imageSlider'),
      () => this.triggerComponent('text'),
      () => handlers.handleBabylon(),
      handlers.handleSave,
    ];
    const textureHandlers = [
      this.handleRemoveTexture,
      this.handleIncreaseTexture,
      this.handleDecreaseTexture,
      () => this.triggerComponent('tint'),
      () => this.triggerComponent('slider'),
    ];
    const textureSelected = isTextureSelected(textures);

    const optionPanelData = textureSelected
      ? {
        names: [...textureButtons, ...generalButtons],
        handlers: [...textureHandlers, ...generalHandlers],
      }
      : { names: generalButtons, handlers: generalHandlers };
    const isOptionSelected = colorPicker || imageSlider || slider || text || tint;
    const components = [
      panel(optionPanelData.names, optionPanelData.handlers),
      option(colorPicker, imageSlider, slider, handlers, text, tint, textures, states.shirtName),
    ];
    const order = isOptionSelected ? [0, 1] : [1, 0];
    return (
      <View style={[Grid.grid, Colors.dark2]}>
        {components[order[0]]}
        {components[order[1]]}
      </View>
    );
  }
}

export default OutputPanel;
