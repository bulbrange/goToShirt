import React, { Component } from 'react';
import {
  View, TouchableHighlight, Text, Image,
} from 'react-native';
import Draggable from 'react-native-draggable';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ColorPicker } from 'react-native-color-picker';
import ImageSlider from 'react-native-image-slider';
import Grid from '../../../styles/grid';
import Colors from '../../../styles/colors';

const img1 = require('../images/textures/bansky1.png');
const img2 = require('../images/textures/chewaka.png');
const img3 = require('../images/textures/it.png');
const img4 = require('../images/textures/keep-calm.png');
const img5 = require('../images/textures/rebel.png');
const img6 = require('../images/textures/soldiers1.png');
const images = [img1, img2, img3, img4, img5, img6];
const Picker = handleBaseColor => (
  <ColorPicker
    onColorSelected={color => handleBaseColor(color)}
    style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
  />
);
const Slider = (images, handleTexture) => (
  <ImageSlider
    images={images}
    style={{ backgroundColor: 'transparent' }}
    customSlide={({
      index, item, style, width,
    }) => (
      // It's important to put style here because it's got offset inside
      <View key={index} style={[{ flex: 1 }]}>
        <TouchableHighlight onPress={() => handleTexture(images[index], 0, 0)}>
          <Image
            source={images[index]}
            style={{
              width: 100,
              height: 100,
              backgroundColor: 'white', 
              margin: 5,
              borderColor: 'black',
              borderWidth: 2,
              marginTop: 50,
            }}
          />
        </TouchableHighlight>
      </View>
    )}
  />
);
class OutputPanel extends Component {
  constructor(props) {
    super(props);
    const { colorPicker, imageSlider, handleBaseColor, handleTextures } = this.props;
    this.state = {};
  }

  render() {
    const { colorPicker, imageSlider, handleBaseColor, handleTextures } = this.props;
    return (
      <View style={[Grid.row, Colors.light]}>
        {colorPicker ? Picker(handleBaseColor) : null}
        {imageSlider ? Slider(images, handleTextures) : null}
      </View>
    );
  }
}

export default OutputPanel;
