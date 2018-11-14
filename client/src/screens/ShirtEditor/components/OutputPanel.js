import React from 'react';
import { View, Slider, StyleSheet } from 'react-native';
import Carrousel from '../../../components/Carrousel';
import PickerColor from '../../../components/PickerColor';
import Grid from '../../../styles/grid';
import { Colors } from '../../../styles/colors';

const img1 = require('./EditorCanvas/images/textures/bansky1.png');
const img2 = require('./EditorCanvas/images/textures/chewaka.png');
const img3 = require('./EditorCanvas/images/textures/it.png');
const img4 = require('./EditorCanvas/images/textures/keep-calm.png');
const img5 = require('./EditorCanvas/images/textures/rebel.png');
const img6 = require('./EditorCanvas/images/textures/soldiers1.png');
const img7 = require('./EditorCanvas/images/textures/surtich.jpeg');

const styles = StyleSheet.create({
  slider: {
    flex: 1,
  },
});

const mockedImages = [img1, img2, img3, img4, img5, img6, img7];
const mockedTshirts = [
  {
    id: 1,
    name: 'Mi cami',
    source: img1,
  },
  {
    id: 2,
    name: 'Tu cami',
    source: img2,
  },
  {
    id: 3,
    name: 'Esber cami',
    source: img3,
  },
  {
    id: 4,
    name: 'Jaime cami',
    source: img4,
  },
  {
    id: 5,
    name: 'Alfredo cami',
    source: img5,
  },
  {
    id: 6,
    name: 'Mi jander',
    source: img6,
  },
  {
    id: 7,
    name: 'Mi more',
    source: img7,
  },
];
const posX = 85;
const posY = 100;
const renderSize = 80;
// (source, id, posX, posY, renderSize, backgroundColor)
const OutputPanel = ({
  colorPicker,
  imageSlider,
  slider,
  handleBaseColor,
  handleTextures,
  handleRotation,
  textureSelected,
  args,
}) => (
  <View style={[Grid.row, Colors.light]}>
    {colorPicker ? PickerColor(handleBaseColor) : null}
    {imageSlider ? (
      <Carrousel
        images={mockedTshirts}
        animated={false}
        handler={handleTextures}
        args={[posX, posY, renderSize, 'transparent']}
      />
    ) : null}
    {slider ? (
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={360}
        disabled={!textureSelected}
        onValueChange={val => handleRotation(val)}
      />
    ) : null}
  </View>
);

export default OutputPanel;
