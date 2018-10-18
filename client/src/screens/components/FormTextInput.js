import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import Grid from '../../styles/grid';

const styles = StyleSheet.create({
  textInput: {
    marginTop: 10,
    height: 60,
    fontSize: 20,
    borderColor: 'gray',
    borderBottomWidth: 1,
  },
});
const FormTextInput = args => (
  <View style={[Grid.row, Grid.p0]}>
    <View style={[Grid.col12, { padding: 20 }, args.styles]}>
      <TextInput
        style={[styles.textInput]}
        placeholder={args.placeholder}
        onChangeText={text => args.handler(text)}
        secureTextEntry={args.pass}
        value={args.value}
      />
    </View>
  </View>
);

export default FormTextInput;
