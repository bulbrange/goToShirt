import React, { Component } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
} from 'react-native';
import Sound from 'react-native-sound';
import Grid from '../../../styles/grid';
import { RawColors, Colors } from '../../../styles/colors';
import mockedTshirts from '../mockedTshirts';
import Carrousel from '../../../components/Carrousel';
import LastChats from '../../../components/LastChats';
import MyLastTshirt from './MyLastTshirt';

const time = new Date();
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
    this.state = {
      currentImageSelected: null,
      name: 'Last T-shirt',
      selected: null,
    };
    this.sound = new Sound('button.mp3', Sound.MAIN_BUNDLE, (error) => {});
  }

  onImageSelected = (source, id) => {
    const selected = mockedTshirts.filter(x => x.id === id)[0];
    this.setState({
      currentImageSelected: source,
      selected,
      name: selected.name,
    });
    this.sound.stop();
    setTimeout(() => {
      Sound.setCategory('Playback', true);
      this.sound.play();
    }, 1);
  };

  handlerChats = ({ item }) => <Text>{item}</Text>;

  render() {
    const { screenProps } = this.props;
    return (
      <View style={[Grid.grid, Colors.white, { paddingTop: 10 }]}>
        <View style={[Grid.grid, Grid.p0, Grid.col7]}>
          <Text
            style={[
              {
                color: RawColors.dark,
                fontWeight: 'bold',
                fontSize: 20,
              },
            ]}
          >
            Last T-Shirt
          </Text>
          <View style={[Grid.row, Grid.p0, { flex: 0.5 }]}>
            <TouchableOpacity style={[Grid.col12, { paddingTop: 10 }]}>
              <Image
                resizeMode="contain"
                style={{
                  flex: 1,
                  width: null,
                  height: null,
                }}
                source={currentImageSelected}
              />
            </TouchableOpacity>
          </View>
          <View style={[Grid.row, Grid.p0, Grid.justifyBetween, { flex: 0.5 }]}>
            <Carrousel images={mockedTshirts} handler={this.onImageSelected} animated args={[]} />
          </View>
        </View>
        <View style={[Grid.col5]}>
          <View style={[Grid.grid]}>
            <Text
              style={[
                {
                  fontFamily: 'crimsontext',
                  color: RawColors.dark,
                  fontWeight: 'bold',
                  fontSize: 20,
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
