import React, { Component } from 'react';
import { View, Text } from 'react-native';

import {
  createStackNavigator,
  StackActions,
  NavigationActions,
  withNavigation,
} from 'react-navigation';
import Grid from '../../styles/grid';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { screenProps } = this.props;
    return (
      <View style={[Grid.grid]}>
        <View style={[Grid.row, Grid.p0, { flex: 1 }]}>
          <View style={[Grid.col12]}>
            <Text>ESTO ES DASHBOARD</Text>
          </View>
        </View>
        <View style={[Grid.row, Grid.p0, { flex: 1 }]}>
          <View style={[Grid.col6]}>
            <Text style={{ fontSize: 30 }}>
              usuario:
              {screenProps.username}
            </Text>
          </View>
          <View style={[Grid.col6]}>
            <Text style={{ fontSize: 30 }}>
              id:
              {screenProps.userId}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
export default Dashboard;
