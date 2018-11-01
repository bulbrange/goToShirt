import React, { Component } from 'react';
import { View, TouchableHighlight, Text, Image } from 'react-native';
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

const Picker = handleBaseColor => (
  <ColorPicker
    onColorSelected={color => handleBaseColor(color)}
    style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
  />
);
const Slider = images => (
  <ImageSlider
    images={[img1, img2, img3, img4, img5, img6]}
    style={{ backgroundColor: 'transparent' }}
  />
);
class OptionPanel extends Component {
  constructor(props) {
    super(props);
    const { handleSwitch } = this.props;
    this.state = {
      colorPicker: false,
      imageSlider: false,
    };
  } 

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

  render() {
    const { handleSwitch, handleBaseColor } = this.props;
    const { colorPicker, imageSlider } = this.state;
    return (
      <View style={[Grid.row, Colors.light, Grid.p0, { flex: 0.4 }]}>
        <View style={[Grid.grid]}>
          <View style={[Grid.row, { flex: 0.25 }]}>
            <View style={[Grid.col2]}>
              <Icon.Button
                name="undo"
                size={36}
                color="white"
                iconStyle={{ marginRight: -10 }}
                onPress={() => handleSwitch()}
                borderRadius={50}
                style={{
                  backgroundColor: Colors.dark.backgroundColor,
                  paddingLeft: 12,
                }}
              />
            </View>
            <View style={[Grid.col2]}>
              <Icon.Button
                name="palette"
                size={36}
                color="white"
                iconStyle={{ marginRight: -10 }}
                onPress={() => this.handleColorPicker()}
                borderRadius={50}
                style={{
                  backgroundColor: Colors.dark.backgroundColor,
                  paddingLeft: 10,
                }}
              />
            </View>
            <View style={[Grid.col2]}>
              <Icon.Button
                name="film"
                size={36}
                color="white"
                iconStyle={{ marginRight: -10 }}
                onPress={() => this.handleImageSlider()}
                borderRadius={50}
                style={{
                  backgroundColor: Colors.dark.backgroundColor,
                  paddingLeft: 9,
                }}
              />
            </View>
          </View>
          <View style={[Grid.row, Colors.light, { flex: 0.75 }]}>
            {colorPicker ? Picker(handleBaseColor) : null}
            {imageSlider ? Slider(null) : null}
          </View>
        </View>
      </View>
    );
  }
}
// <Icon name="rocket" size={30} color="#900" />
export default OptionPanel;
