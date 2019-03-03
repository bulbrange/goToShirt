import React, { Component } from 'react';
import {
  View, Text, WebView, StyleSheet,
} from 'react-native';
import IP from '../ip';
import StackHeader from '../components/StackHeader';

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
      navigation: { state, goBack },
    } = this.props;
    return (
      <View style={styles.container}>
        <StackHeader title={state.params.shirtName} goBack={goBack} />
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
