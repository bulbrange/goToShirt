import React, { Component } from 'react';
import {
  View, TouchableHighlight, Text, Image,
} from 'react-native';
import Draggable from 'react-native-draggable';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ColorPicker } from 'react-native-color-picker';
import Slider from '../../../components/ImageSlider';
import Grid from '../../../styles/grid';
import Colors from '../../../styles/colors';

const img1 = require('../images/textures/bansky1.png');
const img2 = require('../images/textures/chewaka.png');
const img3 = require('../images/textures/it.png');
const img4 = require('../images/textures/keep-calm.png');
const img5 = require('../images/textures/rebel.png');
const img6 = require('../images/textures/soldiers1.png');

const mockedImages = [img1, img2, img3, img4, img5, img6];
const Picker = handleBaseColor => (
  <ColorPicker
    onColorSelected={color => handleBaseColor(color)}
    style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
  />
);

class OutputPanel extends Component {
  constructor(props) {
    super(props);
    const {
      colorPicker, imageSlider, handleBaseColor, handleTextures,
    } = this.props;
    this.state = {};
  }

  render() {
    const {
      colorPicker, imageSlider, handleBaseColor, handleTextures,
    } = this.props;
    return (
      <View style={[Grid.row, Colors.light]}>
        {colorPicker ? Picker(handleBaseColor) : null}
        {imageSlider ? Slider(mockedImages, handleTextures) : null}
      </View>
    );
  }
}

export default OutputPanel;
