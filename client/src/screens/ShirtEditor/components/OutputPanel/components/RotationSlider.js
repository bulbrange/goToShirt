import React from 'react';
import {
  View, Image, Slider, StyleSheet,
} from 'react-native';
import Grid from '../../../../../styles/grid';

const styles = StyleSheet.create({
  slider: {
    color: 'white',
  },
});

const RotationSlider = ({ handler }) => (
  <View style={[Grid.grid]}>
    <View style={[Grid.row]}>
      <View style={[Grid.col1, Grid.justifyCenter]}>
        <Image
          style={{ width: 35, height: 35 }}
          source={{
            uri:
              'https://vignette.wikia.nocookie.net/central/images/1/18/Www.google.com-win-a-free-cube-fidget-spinner.gif/revision/latest?cb=20180225010925',
          }}
        />
      </View>
      <View style={[Grid.col11, Grid.justifyCenter]}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={360}
          onValueChange={val => handler(val)}
        />
      </View>
    </View>
  </View>
);
export default RotationSlider;
