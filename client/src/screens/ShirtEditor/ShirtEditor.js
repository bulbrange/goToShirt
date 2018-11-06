import React, { Component } from 'react';
import {
  View, Animated, Easing, Text,
} from 'react-native';
import Grid from '../../styles/grid';
import EditorCanvas from './components/EditorCanvas';
import OptionPanel from './components/OptionPanel';
import OutputPanel from './components/OutputPanel';

const optionPanelOffsetBottom = -500;
const optionPanelMarginBottom = 20;
const animationDelay = 500;
const front = require('./images/bases/front.png');
const back = require('./images/bases/back.png');

class ShirtEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOptionPanel: false,
      switched: false,
      shirtBaseColor: '#A0A0A0',
      colorPicker: false,
      imageSlider: true,
      saved: false,
      frontTextures: [],
      backTextures: [],
      yValue: new Animated.Value(optionPanelOffsetBottom),
    };
  }

  handleSwitch = async () => {
    const { switched } = this.state;
    await this.setState({
      switched: !switched,
    });
  };

  handleBaseColor = (shirtBaseColor) => {
    this.setState({
      shirtBaseColor,
    });
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

  handleTextures = async (source, posX, posY, renderSize, id) => {
    const { frontTextures, backTextures, switched } = this.state;
    console.log('**************************');
    console.log('TEXTURE ID: ', id);
    console.log('SWITCHED @ CREATING: ', switched);
    if (!switched) {
      await this.setState({
        frontTextures: [
          ...frontTextures,
          {
            source,
            posX,
            posY,
            renderSize,
            id,
          },
        ],
      });
    } else {
      await this.setState({
        backTextures: [
          ...backTextures,
          {
            source,
            posX,
            posY,
            renderSize,
            id,
          },
        ],
      });
    }
    console.log('FRONT @ CREATING: ', this.state.frontTextures);
    console.log('BACK @ CREATING: ', this.state.backTextures);
  };

  updateFrontXY = (source, posX, posY, id) => {
    const { frontTextures, backTextures, switched } = this.state;
    console.log('ID: ', id);
    if (!switched) {
      const newTexturePos = frontTextures.map((texture) => {
        console.log('TEST MATCHING ID: ', id);
        if (texture.id === id) {
          texture.posX = posX;
          texture.posY = posY;
        }
        return texture;
      });
      this.setState({
        frontTextures: newTexturePos,
      });
    } else {
      const newTexturePos = backTextures.map((texture) => {
        console.log('TEST MATCHING ID: ', id);
        if (texture.id === id) {
          texture.posX = posX;
          texture.posY = posY;
        }
        return texture;
      });
      this.setState({
        backTextures: newTexturePos,
      });
    }
  };

  handlerMock = () => console.log('Button Working');

  moveAnimation = () => {
    const { yValue, isOptionPanel } = this.state;
    const newTo = isOptionPanel ? optionPanelOffsetBottom : optionPanelMarginBottom;
    Animated.timing(yValue, {
      toValue: newTo,
      duration: animationDelay,
      asing: Easing.ease,
    }).start();
    this.setState({
      isOptionPanel: !isOptionPanel,
    });
  };

  render() {
    const {
      switched,
      shirtBaseColor,
      isOptionPanel,
      colorPicker,
      imageSlider,
      frontTextures,
      backTextures,
      saved,
      yValue,
    } = this.state;

    return (
      <View style={[Grid.grid]}>
        <View style={[Grid.row, Grid.p0, { flex: 0.7 }]}>
          <EditorCanvas
            switched={switched}
            baseColor={shirtBaseColor}
            handleOptionPanel={this.moveAnimation}
            isOptionPanel={isOptionPanel}
            frontTextures={frontTextures}
            updateFrontXY={this.updateFrontXY}
            backTextures={backTextures}
            handleSwitch={this.handleSwitch}
          />

          <OptionPanel
            animationValues={{ y: yValue }}
            names={['exchange-alt', 'palette', 'film', 'align-center', 'undo', 'tshirt', 'save']}
            handlers={[
              this.handleSwitch,
              this.handleColorPicker,
              this.handleImageSlider,
              this.handlerMock,
              this.handlerMock,
              this.handlerMock,
              this.handlerMock,
            ]}
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
