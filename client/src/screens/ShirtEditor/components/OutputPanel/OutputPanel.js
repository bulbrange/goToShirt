import React, { Component } from 'react';
import { View } from 'react-native';
import Carrousel from '../../../../components/Carrousel';
import PickerColor from './components/PickerColor';
import Grid from '../../../../styles/grid';
import { Colors } from '../../../../styles/colors';
import OptionPanel from './components/OptionPanel';
import RotationSlider from './components/RotationSlider';
import FontPicker from './components/FontPicker';
import mockedImages from './components/mockedImg';

const isTextureSelected = textures => textures.some(texture => texture.focus);

const posX = 85;
const posY = 100;
const renderSize = 80;
const generalButtons = ['exchange-alt', 'palette', 'film', 'align-center', 'tshirt', 'save'];
const textureButtons = ['plus', 'minus', 'tint', 'undo'];

const panel = (names, handlers) => (
  <View style={[Grid.row, Grid.p0, { flex: 0.25 }]}>
    <OptionPanel names={names} handlers={handlers} />
  </View>
);
const option = (colorPicker, imageSlider, slider, text, handlers) => (
  <View style={[Grid.row, Colors.white, Grid.p0, { flex: 0.78 }]}>
    {colorPicker ? <PickerColor handler={handlers.handleBaseColor} /> : null}
    {imageSlider ? (
      <Carrousel
        images={mockedImages}
        animated={false}
        handler={handlers.handleTextures}
        args={[posX, posY, renderSize, 'transparent']}
      />
    ) : null}
    {slider ? <RotationSlider handler={handlers.handleRotation} /> : null}
    {text ? (
      <FontPicker handler={handlers.handleTextures} />
    ) : null}
  </View>
);

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
      if (texture.focus && texture.renderSize > 80) texture.renderSize -= 10;
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
      this.handleSlider,
    ];
    const textureSelected = isTextureSelected([...states.frontTextures, ...states.backTextures]);

    const optionPanelData = textureSelected
      ? {
        names: [...textureButtons, ...generalButtons],
        handlers: [...textureHandlers, ...generalHandlers],
      }
      : { names: generalButtons, handlers: generalHandlers };
    const isOptionSelected = colorPicker || imageSlider || slider || text;
    const components = [
      panel(optionPanelData.names, optionPanelData.handlers),
      option(colorPicker, imageSlider, slider, text, handlers),
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
