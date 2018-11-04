import React from 'react';
import { ColorPicker } from 'react-native-color-picker';

const PickerColor = handle => (
  <ColorPicker
    onColorSelected={color => handle(color)}
    style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
  />
);

export default PickerColor;
