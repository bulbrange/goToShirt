import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ColorPicker } from 'react-native-color-picker';

const PickerColor = ({ handler }) => (
  <TouchableOpacity style={{ flex: 1 }} onPress={() => handler('transparent')}>
    <ColorPicker
      onColorSelected={color => handler(color)}
      style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
    />
  </TouchableOpacity>
);

export default PickerColor;
