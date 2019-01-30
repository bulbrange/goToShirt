import React, { Component } from 'react';
import {
  View, Text, StyleSheet, FlatList,
} from 'react-native';
import { Colors, RawColors } from '../../../styles/colors';
import Grid from '../../../styles/grid';
import StackHeader from '../../../components/StackHeader';

class Share extends Component {
  render() {
    const {
      navigation,
      navigation: { state, goBack },
    } = this.props;

    const groups = state.params.groups;
    const tshirt = state.params.tshirt;

    console.log('Share props', goBack);
    console.log('Share groups', groups);
    console.log('Share tshirt', tshirt);

    return (
      <View style={{ flex: 1 }}>
        <StackHeader title={tshirt.name} goBack={goBack} />
        <View style={Grid.grid}>
          <View style={Grid.row}>
            <Text>SHARE</Text>
          </View>
          <View style={Grid.row}>
            <Text>SHARE</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Share;
