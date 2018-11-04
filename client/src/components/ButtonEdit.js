import React, { Component } from 'react';
import {
  View, Text, TouchableHighlight, StyleSheet, Dimensions,
} from 'react-native';
import { RawColors, Colors } from '../styles/colors';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: width / 2,
    height: height / 2,
    zIndex: 99,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  buttonWrapper: {
    width: 50,
    borderRadius: 35,
    height: 50,
    position: 'absolute',
    right: 50,
    bottom: 100,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: RawColors.dark,
  },
  buttonText: {
    fontSize: 30,
    color: RawColors.white,
  },
});

const ButtonEdit = () => (
  <View style={styles.wrapper}>
    <TouchableHighlight style={styles.buttonWrapper}>
      <Text style={styles.buttonText}>+</Text>
    </TouchableHighlight>
  </View>
);

export default ButtonEdit;
