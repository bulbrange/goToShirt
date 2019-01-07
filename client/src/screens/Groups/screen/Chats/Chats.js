import React, { Component } from 'react';
import {
  Image, View, StyleSheet, Style, Text,
} from 'react-native';

class Chats extends Component {
  render() {
    const { navigation, screenProps } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Text>CHATS</Text>
      </View>
    );
  }
}

export default Chats;
