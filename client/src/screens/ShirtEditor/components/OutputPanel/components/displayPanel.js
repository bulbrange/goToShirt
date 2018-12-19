import React from 'react';
import { View } from 'react-native';
import Grid from '../../../../../styles/grid';
import OptionPanel from './OptionPanel';

const panel = (names, handlers) => (
  <View style={[Grid.row, Grid.p0, { flex: 0.25 }]}>
    <OptionPanel names={names} handlers={handlers} />
  </View>
);

export default panel;
