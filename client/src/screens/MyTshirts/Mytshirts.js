import React from 'react';
import { View, Text } from 'react-native';

import {
  createStackNavigator,
  StackActions,
  NavigationActions,
  withNavigation,
} from 'react-navigation';
import Grid from '../../styles/grid';
import ButtonEdit from '../../components/ButtonEdit';

const Mytshirts = ({ handlers, states }) => (
  <View style={[Grid.row, Grid.p0, { flex: 1 }]}>
    <Text>ESTO ES Myshirts</Text>
    <View style={[Grid.col05, Grid.justifyBetween, { marginTop: 500, marginLeft: 230 }]}>
      <ButtonEdit title="+" />
    </View>
  </View>
);
export default Mytshirts;
