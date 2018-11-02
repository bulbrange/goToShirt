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
const Slider = images => (
  <ImageSlider
    images={images}
    style={{ backgroundColor: 'transparent' }}
    customSlide={({
      index, item, style, width,
    }) => (
      // It's important to put style here because it's got offset inside
      <View key={index} style={[{ flex: 1 }]}>
        <Image source={images[index]} style={{ width: 150, height: 150 }} />
      </View>
    )}
  />
);

/*
  <ImageSlider
    images={[img1, img2, img3, img4, img5, img6]}
    style={{ backgroundColor: 'transparent' }}
  />

*/
class OptionPanel extends Component {
  constructor(props) {
    super(props);
    const { handleSwitch, handleColorPicker, handleImageSlider } = this.props;
    this.state = {};
  }


  render() {
    const { handleSwitch, handleColorPicker, handleImageSlider } = this.props;
    return (
      <View style={[Grid.col2, Colors.white, Grid.p0]}>
        <View style={[Grid.grid]}>
          <View style={[Grid.row]}>
            <Icon.Button
              name="exchange-alt"
              size={32}
              color="white"
              iconStyle={{ marginRight: 0, paddingLeft: 5 }}
              onPress={() => handleSwitch()}
              borderRadius={50}
              style={{
                backgroundColor: Colors.dark.backgroundColor,
                paddingLeft: 5,
                width: 50,
                height: 50,
              }}
            />
          </View>
          <View style={[Grid.row]}>
            <Icon.Button
              name="palette"
              size={32}
              color="white"
              iconStyle={{ marginRight: 0, paddingLeft: 5 }}
              onPress={() => handleColorPicker()}
              borderRadius={50}
              style={{
                backgroundColor: Colors.dark.backgroundColor,
                paddingLeft: 5,
                width: 50,
                height: 50,
              }}
            />
          </View>
          <View style={[Grid.row]}>
            <Icon.Button
              name="film"
              size={32}
              color="white"
              iconStyle={{ marginRight: 0, paddingLeft: 5 }}
              onPress={() => handleImageSlider()}
              borderRadius={50}
              style={{
                backgroundColor: Colors.dark.backgroundColor,
                paddingLeft: 5,
                width: 50,
                height: 50,
              }}
            />
          </View>
          <View style={[Grid.row]}>
            <Icon.Button
              name="align-center"
              size={32}
              color="white"
              iconStyle={{ marginRight: 0, paddingLeft: 7 }}
              onPress={() => console.log("TEXT WORKING")}
              borderRadius={50}
              style={{
                backgroundColor: Colors.dark.backgroundColor,
                paddingLeft: 5,
                width: 50,
                height: 50,
              }}
            />
          </View>
          <View style={[Grid.row]}>
            <Icon.Button
              name="undo"
              size={32}
              color="white"
              iconStyle={{ marginRight: 0, paddingLeft: 5 }}
              onPress={() => console.log("UNDO WORKING")}
              borderRadius={50}
              style={{
                backgroundColor: Colors.dark.backgroundColor,
                paddingLeft: 5,
                width: 50,
                height: 50,
              }}
            />
          </View>
          <View style={[Grid.row]}>
            <Icon.Button
              name="tshirt"
              size={30}
              color="white"
              iconStyle={{ marginRight: 0, paddingLeft: 0 }}
              onPress={() => console.log("BABYLON WORKING")}
              borderRadius={50}
              style={{
                backgroundColor: Colors.dark.backgroundColor,
                paddingLeft: 5,
                width: 50,
                height: 50,
              }}
            />
          </View>
          <View style={[Grid.row]}>
            <Icon.Button
              name="save"
              size={32}
              color="white"
              iconStyle={{ marginRight: 0, paddingLeft: 7 }}
              onPress={() => console.log("SAVE WORKING")}
              borderRadius={50}
              style={{
                backgroundColor: Colors.dark.backgroundColor,
                paddingLeft: 5,
                width: 50,
                height: 50,
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default OptionPanel;
