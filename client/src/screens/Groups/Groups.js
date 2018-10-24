import React from 'react';
import { View, Text } from 'react-native';

import {
  createStackNavigator,
  StackActions,
  NavigationActions,
  withNavigation,
} from 'react-navigation';
import Grid from '../../styles/grid';

const Groups = ({ handlers, states }) => (
  <View style={[Grid.row, Grid.p0, { flex: 1 }]}>
    <Text>ESTO ES Groups</Text>
  </View>
);
export default Groups;
