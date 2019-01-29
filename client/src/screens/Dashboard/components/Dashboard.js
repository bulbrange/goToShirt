import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator,
} from 'react-native';
import Sound from 'react-native-sound';
import Moment from 'react-moment';
import R from 'ramda';
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
      lastGroupsChats: [],
    };
    this.sound = new Sound('button.mp3', Sound.MAIN_BUNDLE, (error) => {});
  }

  componentDidMount = () => {
    const { userById } = this.props;
    const { lastGroupsChats } = this.state;
    console.log('@NextProps', this.props);

    if (!lastGroupsChats.length && userById.groups.length) {
      const groups = userById.groups.map((group) => {
        const messagesWithGroupName = group.messages.map(m => ({ ...m, groupName: group.name }));
        const data = {
          id: group.id,
          name: group.name,
          messages: messagesWithGroupName,
        };
        return data;
      });
      // const list = R.uniqBy(R.prop('phone'), listRaw);

      const myChats = groups[0].messages.map((x) => {
        const data = {
          name: x.groupName,
          text: x.text,
          createdAt: x.createdAt,
        };
        return data;
      });
      console.log('@chats', groups);
      this.setState({
        lastGroupsChats: myChats,
      });
    }
  };

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
    const { screenProps, tshirts, userById } = this.props;
    if (!tshirts || !this.state.lastGroupsChats.length) return <ActivityIndicator size="large" color="#0000ff" />;
    const {
      currentImageSelected, name, options, lastGroupsChats,
    } = this.state;
    console.log('PEPEPEPEPE', this.state.lastGroupsChats);
    tshirts.map((tshirt) => {
      tshirt.source = `http://${IP}:3333/front_${tshirt.id}.png`;
    });

    return (
      <View style={[Grid.grid, Colors.white, { paddingTop: 10 }]}>
        <View style={[Grid.row, { flex: 0.45 }]}>
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
          <TouchableOpacity onPress={this.onImagePress} style={[Grid.col9, { paddingTop: 10 }]}>
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
        <View style={[Grid.row, Grid.p0, Grid.alignMiddle, { flex: 0.25 }]}>
          <Carrousel images={tshirts} handler={this.onImageSelected} animated args={[]} />
        </View>
        <View style={[Grid.col7]}>
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
            <LastChats style={[Grid.grid, Colors.light]} chats={lastGroupsChats} />
          </View>
        </View>
      </View>
    );
  }
}
export default Dashboard;
