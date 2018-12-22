import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Carrousel from '../../../../../components/Carrousel';
import PickerColor from './PickerColor';
import Grid from '../../../../../styles/grid';
import { Colors, RawColors } from '../../../../../styles/colors';
import RotationSlider from './RotationSlider';
import FontPicker from './FontPicker';
import mockedImages from './mockedImg';

const posX = 85;
const posY = 100;
const renderSize = 80;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    alignSelf: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderColor: RawColors.light,
    textAlign: 'center',
  },
});

const optionSwitcher = (
  colorPicker,
  imageSlider,
  slider,
  handlers,
  text,
  tint,
  textures,
  shirtName,
) => {
  if (colorPicker) return <PickerColor handler={handlers.handleBaseColor} mode="bg" />;
  if (tint) return <PickerColor handler={handlers.handleBaseColor} mode="tint" />;
  if (imageSlider) {
    return (
      <Carrousel
        images={mockedImages}
        animated={false}
        handler={handlers.handleTextures}
        args={[posX, posY, renderSize, 'transparent', '', null]}
      />
    );
  }
  if (slider) return <RotationSlider handler={handlers.handleRotation} />;
  if (text) {
    return (
      <FontPicker
        handler={handlers.handleTextures}
        onTextChange={handlers.handleText}
        textures={textures}
      />
    );
  }
  return (
    <TextInput
      style={styles.text}
      onChangeText={name => handlers.handleShirtName(name)}
      placeholder="Your new shirt name"
      value={shirtName}
    />
  );
};

const option = (colorPicker, imageSlider, slider, handlers, text, tint, textures, shirtName) => (
  <View style={[Grid.row, Colors.white, Grid.p0, { flex: 0.78 }]}>
    <View style={Grid.col12}>
      {optionSwitcher(colorPicker, imageSlider, slider, handlers, text, tint, textures, shirtName)}
    </View>
  </View>
);

export default option;
