import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ColorPicker } from 'react-native-color-picker';

const PickerColor = ({ handler, mode }) => (
  <TouchableOpacity
    style={{ flex: 1 }}
    onPress={() => (mode === 'bg' ? handler('transparent') : handler(null, false))}
  >
    <ColorPicker
      onColorSelected={color => (mode === 'bg' ? handler(color) : handler(color, false))}
      style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
    />
  </TouchableOpacity>
);

export default PickerColor;
