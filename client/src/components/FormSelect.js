import React from 'react';
import { Picker, StyleSheet, View } from 'react-native';
import { Colors, RawColors } from '../styles/colors';

const styles = StyleSheet.create({
  wrapper: {
    borderBottomWidth: 0,
    borderColor: RawColors.dark,
    color: RawColors.dark,
  },
});
const FormSelect = args => (
  <View style={[styles.wrapper]}>
    <Picker
      selectedValue={args.selectedValue}
      onValueChange={(itemValue, itemIndex) => args.handler(itemValue, itemIndex)}
    >
      {args.items.map(x => (
        <Picker.Item color={RawColors.dark} key={x.label} label={x.label} value={x.value} />
      ))}
    </Picker>
  </View>
);

export default FormSelect;
