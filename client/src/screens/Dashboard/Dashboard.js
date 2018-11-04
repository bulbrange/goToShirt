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

const Dashboard = ({ handlers, states }) => (
  <View style={[Grid.row, Grid.p0, { flex: 1 }]}>
    <Text>ESTO ES DASHBOARD</Text>
    <ButtonEdit title="+" />
  </View>
);
export default Dashboard;
