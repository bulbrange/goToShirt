import React, { Component } from 'react';
import {
  View, Text, WebView, StyleSheet,
} from 'react-native';
import IP from '../ip';

const styles = StyleSheet.create({
  container: {
    height: 620,
    backgroundColor: 'yellow',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
});

class WebViewer extends Component {
  render() {
    const {
      navigation: { state },
    } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{state.params.shirtName}</Text>
        <WebView
          source={{
            uri: `http://${IP}:8080/${state.params.shirtID}`,
          }}
        />
      </View>
    );
  }
}

export default WebViewer;
