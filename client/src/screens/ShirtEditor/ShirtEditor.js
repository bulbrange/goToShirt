import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Draggable from 'react-native-draggable';
import Grid from '../../styles/grid';
import Colors from '../../styles/colors';
import EditorCanvas from './components/EditorCanvas';
import OptionPanel from './components/OptionPanel';

class ShirtEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switched: false,
      shirtBaseColor: '',
    };
  }

  handleSwitch = () => {
    const { switched } = this.state;
    this.setState({
      switched: !switched,
    });
  };

  handleBaseColor = (shirtBaseColor) => {
    this.setState({
      shirtBaseColor,
    });
    console.log(shirtBaseColor);
  };

  render() {
    const { switched, shirtBaseColor } = this.state;
    return (
      <View style={[Grid.grid]}>
        <EditorCanvas switched={switched} baseColor={shirtBaseColor} />
        <OptionPanel handleSwitch={this.handleSwitch} handleBaseColor={this.handleBaseColor} />
      </View>
    );
  }
}

export default ShirtEditor;
