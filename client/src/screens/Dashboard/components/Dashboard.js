import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator,
} from 'react-native';
import Sound from 'react-native-sound';
import Grid from '../../../styles/grid';
import { RawColors, Colors } from '../../../styles/colors';
import Carrousel from '../../../components/Carrousel';
import LastChats from '../../../components/LastChats';
import IP from '../../../ip';
import WebViewer from '../../WebViewer';

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
    const { tshirts } = this.props;
    const selected = tshirts.filter(x => x.id === id)[0];

    this.setState({
      currentImageSelected: source,
      selected,
      isFront: true,
      name: selected.name,
    });
    this.sound.stop();
    setTimeout(() => {
      Sound.setCategory('Playback', true);
      this.sound.play();
    }, 1);
  };

  onImagePress = () => {
    const { selected } = this.state;
    const {
      navigation: { navigate },
    } = this.props;
    navigate('WebViewer', {
      shirtID: selected.id,
      shirtName: selected.name,
    });
  };

  handlerChats = ({ item }) => <Text>{item}</Text>;

  render() {
    const { screenProps, tshirts } = this.props;
    if (!tshirts) return <ActivityIndicator size="large" color="#0000ff" />;
    const { currentImageSelected, name, options } = this.state;

    tshirts.map((tshirt) => {
      tshirt.source = `http://${IP}:3333/front_${tshirt.id}.png`;
    });

    return (
      <View style={[Grid.grid, Colors.white, { paddingTop: 10 }]}>
        <View style={[Grid.row, { flex: 0.55 }]}>
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
            Last t-shirt
          </Text>
          <TouchableOpacity onPress={this.onImagePress} style={[Grid.col12, { paddingTop: 10 }]}>
            <Image
              resizeMode="contain"
              style={{
                flex: 1,
                width: null,
                height: null,
              }}
              source={{ uri: currentImageSelected }}
            />
          </TouchableOpacity>
        </View>
        <View style={[Grid.row, Grid.p0, Grid.alignMiddle, { flex: 0.3 }]}>
          <Carrousel images={tshirts} handler={this.onImageSelected} animated args={[]} />
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
