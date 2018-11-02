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
          console.log('******************');
          console.log('LASTX: ', texture.posX);
          console.log('NEWX: ', posX);
          console.log('LASTY: ', texture.posY);
          console.log('NEWY: ', posY);
          texture.posX = posX;
          texture.posY = posY;
        }
        console.log('--------------');
        console.log('RESULT X: ', texture.posX);
        console.log('RESULT Y: ', texture.posY);
        return texture;
      });
      this.setState({
        frontTextures: newTexturePos,
      });
    } else {
      const newTexturePos = backTextures.map((texture) => {
        if (texture.source === source) {
          console.log('******************');
          console.log('LASTX: ', texture.posX);
          console.log('NEWX: ', posX);
          console.log('LASTY: ', texture.posY);
          console.log('NEWY: ', posY);
          texture.posX = posX;
          texture.posY = posY;
        }
        console.log('--------------');
        console.log('RESULT X: ', texture.posX);
        console.log('RESULT Y: ', texture.posY);
        return texture;
      });
      this.setState({
        backTextures: newTexturePos,
      });
    }
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
              handleSwitch={this.handleSwitch}
              handleBaseColor={this.handleBaseColor}
              isOptionPanel={isOptionPanel}
              handleColorPicker={this.handleColorPicker}
              handleImageSlider={this.handleImageSlider}
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
