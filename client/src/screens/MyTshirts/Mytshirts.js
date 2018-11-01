import React from 'react';
import { View, Text } from 'react-native';

import {
  createStackNavigator,
  StackActions,
  NavigationActions,
  withNavigation,
} from 'react-navigation';
import Grid from '../../styles/grid';

const Mytshirts = ({ handlers, states }) => (
  <View style={[Grid.row, Grid.p0, { flex: 1 }]}>
    <Text>ESTO ES Myshirts</Text>
  </View>
);
export default Mytshirts;
