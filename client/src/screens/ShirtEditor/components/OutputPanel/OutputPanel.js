import React, { Component } from 'react';
import { View } from 'react-native';
import Carrousel from '../../../../components/Carrousel';
import PickerColor from './components/PickerColor';
import Grid from '../../../../styles/grid';
import { Colors } from '../../../../styles/colors';
import OptionPanel from './components/OptionPanel';
import RotationSlider from './components/RotationSlider';
import mockedImages from './components/mockedImg';

const isTextureSelected = textures => textures.some(texture => texture.focus);

const posX = 85;
const posY = 100;
const renderSize = 80;
const names1 = ['exchange-alt', 'palette', 'film', 'align-center', 'tshirt', 'save'];
const names2 = ['plus', 'minus', 'tint', 'undo'];

class OutputPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorPicker: false,
      slider: false,
      imageSlider: true,
    };
  }

  handleColorPicker = () => {
    const { colorPicker } = this.state;
    this.setState({
      colorPicker: !colorPicker,
      imageSlider: false,
      slider: false,
    });
  };

  handleSlider = () => {
    const { slider } = this.state;
    this.setState({
      slider: !slider,
      imageSlider: false,
      colorPicker: false,
    });
  };

  handleCarrousel = () => {
    const { imageSlider } = this.state;
    this.setState({
      imageSlider: !imageSlider,
      colorPicker: false,
      slider: false,
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
    const { colorPicker, imageSlider, slider } = this.state;

    const handlers1 = [
      handlers.handleSwitch,
      this.handleColorPicker,
      this.handleCarrousel,
      () => console.log('text working'),
      () => console.log('babylon working'),
      handlers.handlerSave,
    ];
    const handlers2 = [
      this.handleIncreaseTexture,
      this.handleDecreaseTexture,
      () => console.log('tint working'),
      this.handleSlider,
    ];
    const textureSelected = isTextureSelected([...states.frontTextures, ...states.backTextures]);

    const optionPanelData = textureSelected
      ? { names: [...names2, ...names1], handlers: [...handlers2, ...handlers1] }
      : { names: names1, handlers: handlers1 };
    const isOptionSelected = colorPicker || imageSlider || slider;
    return (
      <View style={[Grid.grid, Colors.dark]}>
        <View style={[Grid.row, Grid.p0, { flex: 0.25 }]}>
          <OptionPanel names={optionPanelData.names} handlers={optionPanelData.handlers} />
        </View>
        {isOptionSelected ? (
          <View style={[Grid.row, Colors.light, Grid.p0, { flex: 0.78 }]}>
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
          </View>
        ) : null}
      </View>
    );
  }
}

export default OutputPanel;
