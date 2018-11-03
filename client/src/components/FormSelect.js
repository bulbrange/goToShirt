import React from 'react';
import { Picker, StyleSheet, View } from 'react-native';
import Colors from '../styles/colors';

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderRadius: 5,
  },
});
const FormSelect = args => (
  <View style={[styles.wrapper, Colors.primaryBorder]}>
    <Picker
      selectedValue={args.selectedValue}
      onValueChange={(itemValue, itemIndex) => args.handler(itemValue, itemIndex)}
    >
      {args.items.map(x => (
        <Picker.Item key={x.label} label={x.label} value={x.value} />
      ))}
    </Picker>
  </View>
);

export default FormSelect;
