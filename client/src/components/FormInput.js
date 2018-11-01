import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import Grid from '../styles/grid';

const styles = StyleSheet.create({
  textInput: {
    marginTop: 10,
    height: 60,
    fontSize: 20,
    borderColor: 'gray',
    borderBottomWidth: 1,
  },
});
const FormInput = args => (
  <TextInput
    style={[styles.textInput]}
    placeholder={args.placeholder}
    onChangeText={text => args.handler(text)}
    secureTextEntry={args.secure}
    value={args.value}
  />
);

export default FormInput;
