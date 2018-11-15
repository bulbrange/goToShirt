import React, { Component } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
} from 'react-native';
import Grid from '../../styles/grid';
import { RawColors, Colors } from '../../styles/colors';
import mockedTshirts from './mockedTshirts';
import Carrousel from '../../components/Carrousel';
import LastChats from '../../components/LastChats';
import MyLastTshirt from './componnents/MyLastTshirt';

const styles = StyleSheet.create({
  chatsAlert: {
    backgroundColor: RawColors.light,
    color: RawColors.dark,
  },
});

const moksChat = [
  { text: 'Pepetters Group 1' },
  { text: 'I-Men' },
  { text: 'Bar Manolo' },
  { text: 'Hipsteria' },
  { text: 'The latin of kings' },
  { text: 'Pepetters Group 1' },
  { text: 'I-Men' },
  { text: 'Bar Manolo' },
  { text: 'Hipsteria' },
  { text: 'The latin of kings' },
];

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handlerChats = ({ item }) => <Text>{item}</Text>;

  render() {
    const { screenProps } = this.props;
    return (
      <View style={[Grid.grid, Colors.white, { padding: 10 }]}>
        <View style={[Grid.grid, Grid.p0, Grid.col8]}>
          <Text
            style={[
              {
                color: RawColors.dark,
                fontWeight: 'bold',
                fontSize: 30,
              },
            ]}
          >
            Last T-Shirt
          </Text>
          <MyLastTshirt />
        </View>
        <View style={[Grid.col4]}>
          <View style={[Grid.grid]}>
            <Text
              style={[
                {
                  fontFamily: 'crimsontext',
                  color: RawColors.dark,
                  fontWeight: 'bold',
                  fontSize: 30,
                },
              ]}
            >
              Last Chats
            </Text>
            <LastChats style={[Grid.grid, Colors.light]} chats={moksChat} />
          </View>
        </View>
      </View>
    );
  }
}
export default Dashboard;
