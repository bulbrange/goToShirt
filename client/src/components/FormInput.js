import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { Colors2, RawColors, RawColors2 } from '../styles/colors';
// borderBottomWidth: 1,
const styles = StyleSheet.create({
  textInput: {
    marginTop: 15,
    height: 35,
    paddingLeft: 15,
    paddingTop: 8,
    fontSize: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    borderRadius: 5,
    borderColor: RawColors.primary,
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
