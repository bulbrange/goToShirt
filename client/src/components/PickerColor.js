import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ColorPicker } from 'react-native-color-picker';

const PickerColor = handle => (
  <TouchableOpacity style={{ flex: 1 }} onPress={() => handle('transparent')}>
    <ColorPicker
      onColorSelected={color => handle(color)}
      style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
    />
  </TouchableOpacity>
);

export default PickerColor;
