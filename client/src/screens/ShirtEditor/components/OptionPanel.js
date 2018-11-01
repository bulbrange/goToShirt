import React, { Component } from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import Draggable from 'react-native-draggable';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ColorPicker } from 'react-native-color-picker';
import Grid from '../../../styles/grid';
import Colors from '../../../styles/colors';

const Picker = handleBaseColor => (
  <ColorPicker onColorSelected={color => handleBaseColor(color)} style={{ flex: 1 }} />
);
class OptionPanel extends Component {
  constructor(props) {
    super(props);
    const { handleSwitch } = this.props;
    this.state = {
      colorPicker: false,
    };
  }

  handleColorPicker = () => {
    const { colorPicker } = this.state;
    this.setState({
      colorPicker: !colorPicker,
    });
  };

  render() {
    const { handleSwitch, handleBaseColor } = this.props;
    const { colorPicker } = this.state;
    return (
      <View style={[Grid.row, Colors.light, { flex: 0.4 }]}>
        <View style={[Grid.grid]}>
          <View style={[Grid.row, { flex: 0.25 }]}>
            <View style={[Grid.col2]}>
              <Icon.Button
                name="undo"
                size={36}
                color="white"
                iconStyle={{ marginLeft: 2 }}
                onPress={() => handleSwitch()}
                style={{
                  backgroundColor: Colors.dark.backgroundColor,
                }}
              />
            </View>
            <View style={[Grid.col2]}>
              <Icon.Button
                name="paint-brush"
                size={36}
                color="white"
                iconStyle={{ marginLeft: 2 }}
                onPress={() => this.handleColorPicker()}
                style={{
                  backgroundColor: Colors.dark.backgroundColor,
                }}
              />
            </View>
          </View>
          <View style={[Grid.row, Colors.primary, Grid.p0, { flex: 0.75 }]}>
            {colorPicker ? Picker(handleBaseColor) : <Text>EMPTY OPTIONS</Text>}
          </View>
        </View>
      </View>
    );
  }
}
// <Icon name="rocket" size={30} color="#900" />
export default OptionPanel;
