import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Draggable from 'react-native-draggable';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Grid from '../../styles/grid';
import Colors from '../../styles/colors';
import EditorCanvas from './components/EditorCanvas';
import OptionPanel from './components/OptionPanel';
import OutputPanel from './components/OutputPanel';

class ShirtEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOptionPanel: true,
      switched: false,
      shirtBaseColor: '',
      colorPicker: false,
      imageSlider: true,
      saved: false,
      frontTextures: [],
      backTextures: [],
    };
  }

  handleSwitch = () => {
    const { switched } = this.state;
    this.setState({
      switched: !switched,
    });
  };

  handleOptionPanel = () => {
    const { isOptionPanel } = this.state;
    this.setState({
      isOptionPanel: !isOptionPanel,
    });
  };

  handleBaseColor = (shirtBaseColor) => {
    this.setState({
      shirtBaseColor,
    });
    console.log(shirtBaseColor);
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

  handleTextures = (source, posX, posY) => {
    const { frontTextures, backTextures, switched } = this.state;
    if (!switched) {
      this.setState({
        frontTextures: [...frontTextures, { source, posX, posY }],
      });
    } else {
      this.setState({
        backTextures: [...backTextures, { source, posX, posY }],
      });
    }
  };

  updateFrontXY = (source, posX, posY) => {
    const { frontTextures, backTextures, switched } = this.state;
    if (!switched) {
      const newTexturePos = frontTextures.map((texture) => {
        if (texture.source === source) {
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
        if (texture.source === source) {
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
    } = this.state;
    return (
      <View style={[Grid.grid]}>
        <View style={[Grid.row, Grid.p0, { flex: 0.7 }]}>
          <EditorCanvas
            switched={switched}
            baseColor={shirtBaseColor}
            handleOptionPanel={this.handleOptionPanel}
            isOptionPanel={isOptionPanel}
            frontTextures={frontTextures}
            updateFrontXY={this.updateFrontXY}
            backTextures={backTextures}
          />

          {isOptionPanel ? (
            <OptionPanel
              names={['exchange-alt', 'palette', 'film', 'align-center', 'undo', 'tshirt', 'save']}
              handlers={[
                this.handleSwitch,
                this.handleColorPicker,
                this.handleImageSlider,
                this.handlerMock,
                this.handlerMock,
                this.handlerMock,
                this.handlerSave,
              ]}
            />
          ) : null}
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
