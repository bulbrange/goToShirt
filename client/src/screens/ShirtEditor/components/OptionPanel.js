import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import IconButton from '../../../components/IconButton';
import Grid from '../../../styles/grid';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    right: 5,
  },
  animation: {
    backgroundColor: 'rgba(180,180,180,0.6)',
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
  },
});
const OptionPanel = ({ names, handlers, animationValues }) => (
  <View style={[Grid.col2, Grid.p0, styles.container]}>
    <Animated.View style={[Grid.grid, styles.animation, { bottom: animationValues.y }]}>
      {names.map((name, i) => (
        <View key={name} style={[Grid.row, { paddingVertical: 8 }]}>
          <IconButton name={name} size={32} handler={handlers[i]} />
        </View>
      ))}
    </Animated.View>
  </View>
);
export default OptionPanel;
