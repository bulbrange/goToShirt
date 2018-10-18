import React from 'react';
import {
  View, Text, WebView, StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    hieght: 620,
    backgroundColor: 'yellow',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
});

const WebViewExample = () => (
  <View style={styles.container}>
    <Text style={styles.welcome}>Welcome to goToShirt!!</Text>
    <WebView
      source={{
        uri: 'http://esberfes.es/testBabylon/index.html',
      }}
    />
  </View>
);

export default WebViewExample;
