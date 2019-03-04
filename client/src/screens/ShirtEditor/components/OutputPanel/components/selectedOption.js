import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import Carrousel from '../../../../../components/Carrousel';
import PickerColor from './PickerColor';
import Grid from '../../../../../styles/grid';
import { Colors, RawColors } from '../../../../../styles/colors';
import RotationSlider from './RotationSlider';
import FontPicker from './FontPicker';
import mockedImages from './mockedImg';
import IP from '../../../../../ip';

const posX = 85;
const posY = 100;
const renderSize = 80;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderBottomWidth: 2,
    borderColor: RawColors.black,
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
        editor
        images={mockedImages}
        animated={false}
        handler={handlers.handleTextures}
        args={[posX, posY, renderSize, 'transparent', '', null]}
        style={{ backgroundColor: RawColors.light2 }}
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
  <View style={[Grid.row, Colors.light2, Grid.p0, { flex: 0.78 }]}>
    <View style={[Grid.col12, Grid.p0, Colors.shadow]}>
      {optionSwitcher(colorPicker, imageSlider, slider, handlers, text, tint, textures, shirtName)}
    </View>
  </View>
);

export default option;
