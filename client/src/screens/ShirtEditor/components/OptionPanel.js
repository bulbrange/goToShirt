import React, { Component } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Grid from '../../../styles/grid';
import Colors from '../../../styles/colors';

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
            <Icon
              name="exchange-alt"
              size={32}
              color={Colors.dark.backgroundColor}
              onPress={() => handleSwitch()}
              borderRadius={50}
              style={{
                backgroundColor: 'transparent',
                paddingLeft: 10,
              }}
            />
          </View>
          <View style={[Grid.row]}>
            <Icon
              name="palette"
              size={32}
              color={Colors.dark.backgroundColor}
              onPress={() => handleColorPicker()}
              style={{
                backgroundColor: 'transparent',
                paddingLeft: 10,
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
              onPress={() => console.log('TEXT WORKING')}
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
              onPress={() => console.log('UNDO WORKING')}
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
              onPress={() => console.log('BABYLON WORKING')}
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
              onPress={() => console.log('SAVE WORKING')}
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
