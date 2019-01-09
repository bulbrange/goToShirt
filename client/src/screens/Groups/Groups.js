import React, { Component } from 'react';
import {
  View, Text, PermissionsAndroid, FlatList,
} from 'react-native';
import {
  createStackNavigator,
  StackActions,
  NavigationActions,
  withNavigation,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import Contacts from 'react-native-contacts';
import ButtonEdit from '../../components/ButtonEdit';
import Grid from '../../styles/grid';
import Colors from '../../styles/colors';
import Chats from './screen/Chats/Chats';
import Friends from './screen/Friends/index';

const TestScreen = title => () => (
  <View style={[Grid.grid]}>
    <Text>{title}</Text>
  </View>
);

const SocialNavigator = createMaterialTopTabNavigator(
  {
    Chats: {
      screen: Chats,
      navigationOptions: {
        tabBarOptions: {
          style: {
            backgroundColor: '#29434e',
          },
        },
      },
    },
    Friends: {
      screen: Friends,
      navigationOptions: {
        tabBarOptions: {
          style: {
            backgroundColor: '#29434e',
          },
        },
      },
    },
  },
  {
    initialRouteName: 'Chats',
  },
);

class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { screenProps } = this.props;

    return (
      <View style={[Grid.grid]}>
        <SocialNavigator />
      </View>
    );
  }
}
export default Groups;
