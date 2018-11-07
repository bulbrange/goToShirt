import React from 'react';
import { Image, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation'; // Version can be specified in package.json
import Dashboard from '../Dashboard/Dashboard';
import Groups from '../Groups/Groups';
import Mytshirts from '../MyTshirts/Mytshirts';
import Colors from '../../styles/colors';
import ButtonEdit from '../../components/ButtonEdit';
import IconButton from '../../components/IconButton';

const TabNavigator = createBottomTabNavigator({
  Mytshirts: {
    screen: Mytshirts,
    navigationOptions: {
      tabBarOptions: {
        showLabel: false,
        activeBackgroundColor: Colors.light.backgroundColor,
      },
      tabBarIcon: () => (
        <Image style={{ width: 25, height: 25 }} source={require('../../assets/icons/pp.png')} />
      ),
    },
  },
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      tabBarOptions: {
        showLabel: false,
        activeBackgroundColor: Colors.light.backgroundColor,
      },
      tabBarIcon: () => (
        <Image
          style={{ width: 25, height: 25 }}
          source={{
            uri: 'http://simpleicon.com/wp-content/uploads/dashboard.png',
          }}
        />
      ),
    },
  },
  Groups: {
    screen: Groups,
    navigationOptions: {
      tabBarOptions: {
        showLabel: false,
        activeBackgroundColor: Colors.light.backgroundColor,
      },
      tabBarIcon: () => (
        <Image
          style={{ width: 25, height: 25 }}
          source={{
            uri:
              'https://banner2.kisspng.com/20180629/zqg/kisspng-font-awesome-computer-icons-user-group-icon-5b35d85eb98ff8.6265330615302554547601.jpg',
          }}
        />
      ),
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
        <ButtonEdit />
      </View>
    );
  }
}

export default MainTabNavigator;
