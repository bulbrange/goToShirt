import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, RawColors } from '../styles/colors';
import IconButton from './IconButton';

const headerStyles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: RawColors.dark,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  text: {
    color: 'white',
    marginLeft: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const StackHeader = ({ title, goBack }) => (
  <View style={headerStyles.container}>
    <IconButton name="arrow-left" size={25} handler={() => goBack()} styles={{ color: 'white' }} />
    <Text style={headerStyles.text}>{title}</Text>
  </View>
);
export default StackHeader;
