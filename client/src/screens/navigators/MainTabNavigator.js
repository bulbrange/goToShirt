import React from 'react';
import {
  Image, View, StyleSheet, Style,
} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation'; // Version can be specified in package.json
import Dashboard from '../Dashboard/Dashboard';
import Groups from '../Groups/Groups';
import Mytshirts from '../MyTshirts/index';
import Colors from '../../styles/colors';
import ButtonEdit from '../../components/ButtonEdit';
import IconFont from '../../components/IconFont';
import ShirtEditor from '../ShirtEditor';

const TabNavigator = createBottomTabNavigator({
  Mytshirts: {
    screen: Mytshirts,
    navigationOptions: {
      tabBarOptions: {
        showLabel: false,
        activeBackgroundColor: '#cfd8dc',
      },
      tabBarIcon: () => <IconFont name="tshirt" size={35} />,
    },
  },
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      tabBarOptions: {
        showLabel: false,
        activeBackgroundColor: '#cfd8dc',
      },
      tabBarIcon: () => <IconFont name="chalkboard" size={35} />,
    },
  },
  Groups: {
    screen: ShirtEditor,
    navigationOptions: {
      tabBarOptions: {
        showLabel: false,
        activeBackgroundColor: '#cfd8dc',
      },
      tabBarIcon: () => <IconFont name="user-friends" size={35} />,
    },
  },
});

class MainTabNavigator extends React.Component {
  static router = TabNavigator.router;

  render() {
    const { navigation, screenProps } = this.props;

    return (
      <View style={{ flex: 1, zIndex: 101 }}>
        <View style={{ flex: 1 }}>
          <TabNavigator navigation={navigation} screenProps={screenProps} />
        </View>
        <ButtonEdit navigation={navigation} />
      </View>
    );
  }
}

export default MainTabNavigator;
