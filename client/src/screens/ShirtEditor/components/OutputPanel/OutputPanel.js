import React, { Component } from 'react';
import { View } from 'react-native';
import Grid from '../../../../styles/grid';
import { Colors } from '../../../../styles/colors';
import option from './components/selectedOption';
import panel from './components/displayPanel';

export const isTextureSelected = textures => textures.some(texture => texture.focus);

const generalButtons = ['exchange-alt', 'palette', 'film', 'align-center', 'tshirt', 'save'];
const textureButtons = ['plus', 'minus', 'tint', 'undo'];

class OutputPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorPicker: false,
      slider: false,
      imageSlider: false,
      text: false,
    };
  }

  triggerComponent = (active) => {
    const {
      text, imageSlider, colorPicker, slider,
    } = this.state;
    this.setState({
      text: active === 'text' ? !text : false,
      imageSlider: active === 'imageSlider' ? !imageSlider : false,
      colorPicker: active === 'colorPicker' ? !colorPicker : false,
      slider: active === 'slider' ? !slider : false,
    });
  };

  handleDecreaseTexture = () => {
    const { states } = this.props;
    [...states.frontTextures, ...states.backTextures].map((texture) => {
      if (texture.focus && (texture.renderSize > 80 || texture.text.length)) texture.renderSize -= 10;
      return texture;
    });
    this._reactInternalFiber._debugOwner.stateNode.setState({
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
    this._reactInternalFiber._debugOwner.stateNode.setState({
      frontTextures: states.frontTextures,
      backTextures: states.backTextures,
    });
  };

  render() {
    const { handlers, states } = this.props;
    const {
      colorPicker, imageSlider, slider, text,
    } = this.state;

    const textures = [...states.frontTextures, ...states.backTextures];
    const generalHandlers = [
      handlers.handleSwitch,
      () => this.triggerComponent('colorPicker'),
      () => this.triggerComponent('imageSlider'),
      () => this.triggerComponent('text'),
      () => console.log('babylon working'),
      handlers.handlerSave,
    ];
    const textureHandlers = [
      this.handleIncreaseTexture,
      this.handleDecreaseTexture,
      () => console.log('tint working'),
      () => this.triggerComponent('slider'),
    ];
    const textureSelected = isTextureSelected(textures);

    const optionPanelData = textureSelected
      ? {
        names: [...textureButtons, ...generalButtons],
        handlers: [...textureHandlers, ...generalHandlers],
      }
      : { names: generalButtons, handlers: generalHandlers };
    const isOptionSelected = colorPicker || imageSlider || slider || text;
    const components = [
      panel(optionPanelData.names, optionPanelData.handlers),
      option(colorPicker, imageSlider, slider, handlers, text, textures),
    ];
    const order = isOptionSelected ? [0, 1] : [1, 0];
    return (
      <View style={[Grid.grid, Colors.white]}>
        {components[order[0]]}
        {components[order[1]]}
      </View>
    );
  }
}

export default OutputPanel;