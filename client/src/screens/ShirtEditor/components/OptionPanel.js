import React from 'react';
import { View } from 'react-native';
import IconButton from '../../../components/IconButton';
import Grid from '../../../styles/grid';
import Colors from '../../../styles/colors';

const OptionPanel = ({ names, handlers }) => (
  <View style={[Grid.col2, Colors.white, Grid.p0]}>
    <View style={[Grid.grid]}>
      {names.map((name, i) => (
        <View key={name} style={[Grid.row]}>
          <IconButton name={name} size={32} handler={handlers[i]} />
        </View>
      ))}
    </View>
  </View>
);

export default OptionPanel;
