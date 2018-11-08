import React from 'react';
import { View } from 'react-native';
import PickerColor from '../../../components/PickerColor';
import Slider from '../../../components/Slider';
import Grid from '../../../styles/grid';
import Colors from '../../../styles/colors';

const img1 = require('../images/textures/bansky1.png');
const img2 = require('../images/textures/chewaka.png');
const img3 = require('../images/textures/it.png');
const img4 = require('../images/textures/keep-calm.png');
const img5 = require('../images/textures/rebel.png');
const img6 = require('../images/textures/soldiers1.png');
const img7 = require('../images/textures/surtich.jpeg');

const mockedImages = [img1, img2, img3, img4, img5, img6, img7];
const posX = 85;
const posY = 100;
const renderSize = 200;

const OutputPanel = ({
  colorPicker, imageSlider, handleBaseColor, handleTextures,
}) => (
  <View style={[Grid.row, Colors.light]}>
    {colorPicker ? PickerColor(handleBaseColor) : null}
    {imageSlider
      ? Slider(mockedImages, handleTextures)([
        posX,
        posY,
        renderSize,
        Math.floor(Math.random() * 1000),
      ])
      : null}
  </View>
);
export default OutputPanel;
