import React, { Component } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
} from 'react-native';

import {
  createStackNavigator,
  StackActions,
  NavigationActions,
  withNavigation,
} from 'react-navigation';
import Grid from '../../styles/grid';
import mockedTshirts from './mockedTshirts';
import Carrousel from '../../components/Carrousel';

const styles = StyleSheet.create({
  chatsAlert: {},
});

const moksChat = [
  { text: 'Pepetters Group 1' },
  { text: 'I-Men' },
  { text: 'Bar Manolo' },
  { text: 'Hipsteria' },
  { text: 'The latin of kings' },
];

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImageSelected: null,
      name: 'Last T-shirt',
      selected: null,
      isFront: true,
      optionsShirt: false,
      optionsChats: false,
    };
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <TouchableOpacity style={styles.button} onPress={this.onPress}>
      <Text> Touch Here </Text>
    </TouchableOpacity>
  );

  render() {
    const { screenProps } = this.props;
    return (
      <View style={[Grid.grid]}>
        <View style={[Grid.row, Grid.p0, { flex: 0.5 }]}>
          <View style={[Grid.row, Grid.p0, Grid.justifyBetween, { flex: 1 }]}>
            <Carrousel images={mockedTshirts} handler={this.onImageSelected} />
          </View>
        </View>
        <View style={[Grid.row, Grid.p0, { flex: 0.5 }]}>
          <View style={[Grid.col12]}>
            <FlatList
              data={moksChat}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem}
            />
          </View>
        </View>
      </View>
    );
  }
}
export default Dashboard;
