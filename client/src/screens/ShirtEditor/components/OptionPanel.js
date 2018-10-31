import React, { Component } from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import Draggable from 'react-native-draggable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Grid from '../../../styles/grid';
import Colors from '../../../styles/colors';

class OptionPanel extends Component {
  constructor(props) {
    super(props);
    const { handleSwitch } = this.props;
  }

  render() {
    const { handleSwitch } = this.props;
    return (
      <View style={[Grid.row, Colors.light, { flex: 0.4 }]}>
        <View style={[Grid.grid]}>
          <View style={[Grid.row, Grid.p0, { flex: 0.2 }]}>
            <View style={[Grid.col2]}>
              <Icon.Button
                name="undo"
                size={40}
                color="white"
                iconStyle={{ marginLeft: 5 }}
                onPress={() => handleSwitch()}
                style={{
                  backgroundColor: Colors.dark.backgroundColor,
                }}
              />
            </View>
            <View style={[Grid.col2]}>
              <Icon.Button
                name="undo"
                size={40}
                color="white"
                iconStyle={{ marginLeft: 4 }}
                onPress={() => handleSwitch()}
                style={{
                  backgroundColor: Colors.dark.backgroundColor,
                }}
              />
            </View>
          </View>
          <View style={[Grid.row, { flex: 0.8 }]}>
            <View style={Colors.primary} />
          </View>
        </View>
      </View>
    );
  }
}
// <Icon name="rocket" size={30} color="#900" />
export default OptionPanel;
