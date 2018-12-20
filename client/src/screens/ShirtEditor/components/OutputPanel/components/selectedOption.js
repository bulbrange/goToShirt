import React from 'react';
import { View } from 'react-native';
import Carrousel from '../../../../../components/Carrousel';
import PickerColor from './PickerColor';
import Grid from '../../../../../styles/grid';
import { Colors } from '../../../../../styles/colors';
import RotationSlider from './RotationSlider';
import FontPicker from './FontPicker';
import mockedImages from './mockedImg';

const posX = 85;
const posY = 100;
const renderSize = 80;

const option = (colorPicker, imageSlider, slider, handlers, text, tint, textures) => (
  <View style={[Grid.row, Colors.white, Grid.p0, { flex: 0.78 }]}>
    {colorPicker ? <PickerColor handler={handlers.handleBaseColor} mode="bg" /> : null}
    {tint ? <PickerColor handler={handlers.handleBaseColor} mode="tint" /> : null}
    {imageSlider ? (
      <Carrousel
        images={mockedImages}
        animated={false}
        handler={handlers.handleTextures}
        args={[posX, posY, renderSize, 'transparent', '', null]}
      />
    ) : null}
    {slider ? <RotationSlider handler={handlers.handleRotation} /> : null}
    {text ? (
      <FontPicker
        handler={handlers.handleTextures}
        onTextChange={handlers.handleText}
        textures={textures}
      />
    ) : null}
  </View>
);

export default option;
