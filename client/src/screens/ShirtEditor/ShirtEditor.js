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
    };
  }

  handleSwitch = () => {
    const { switched } = this.state;
    this.setState({
      switched: !switched,
    });
    console.log('ASPODHAPOSDHÑ');
  };

  render() {
    const { switched } = this.state;
    return (
      <View style={[Grid.grid]}>
        <EditorCanvas switched={switched} />
        <OptionPanel handleSwitch={this.handleSwitch} />
      </View>
    );
  }
}

export default ShirtEditor;
