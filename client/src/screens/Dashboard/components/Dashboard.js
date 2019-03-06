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
import GROUP_ADDED_SUBSCRIPTION from '../../../queries/group-added.subscription';
import { wsClient } from '../../../App';
import antiCache from '../../../utils/utils';

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
      lastGroupsChats: [],
    };
    this.sound = new Sound('button.mp3', Sound.MAIN_BUNDLE, (error) => { });
  }


  componentDidMount = () => {
    const {
      userById, auth, subscribeToMore, subscribeToMessages,
    } = this.props;
    const { lastGroupsChats } = this.state;
    console.log('DID DASH')
    /*if (!this.subscription) {
      this.subscription = subscribeToMore({
        document: GROUP_ADDED_SUBSCRIPTION,
        variables: {
          userId: auth.id,
        },

        updateQuery: (previousResult, { subscriptionData }) => {
          if (!subscriptionData.data) return previousResult;
          const newGroup = subscriptionData.data.groupAdded;
          const groupLens = R.lensPath(['userById', 'groups']);
          const newResult = R.over(
            groupLens,
            R.prepend({
              __typename: 'Group',
              id: newGroup.id,
              messages: [],
              name: newGroup.name,
              tshirts: [],
              users: newGroup.users,
            }),
            previousResult,
          );
          return newResult;
        },
      });
    }*/

    if (!this.messageSubscription) {
      this.messageSubscription = subscribeToMessages();
    }

    if (!this.reconnected) {
      this.reconnected = wsClient.onReconnected(() => {
        const { refetch } = this.props;
        refetch();
      }, this);
    }

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
      this.setState({
        lastGroupsChats: groups,
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    const { userById } = nextProps;

    if (userById.groups.length) {
      const groups = userById.groups.map((group) => {
        const messagesWithGroupName = group.messages.map(m => ({ ...m, groupName: group.name }));
        const data = {
          id: group.id,
          name: group.name,
          messages: messagesWithGroupName,
        };
        return data;
      });

      this.setState({
        lastGroupsChats: groups,
      });
    }
  }

  goToMessages = group => () => {
    const {
      navigation: { navigate },
    } = this.props;
    navigate('Messages', { groupId: group.id, title: group.name });
  };

  onImagePress = (source, id) => {
    const {
      navigation: { navigate },
    } = this.props;
    const { tshirts } = this.props;
    const selected = tshirts.filter(x => x.id === id)[0];

    navigate('WebViewer', {
      shirtID: id,
      shirtName: selected.name,
    });
  };

  handlerChats = ({ item }) => <Text>{item}</Text>;

  render() {
    const { screenProps, tshirts, userById } = this.props;

    if (!tshirts) return <ActivityIndicator size="large" color="#0000ff" />;
    const {
      currentImageSelected, name, options, lastGroupsChats,
    } = this.state;
    const tshirtsWithAntiCache = antiCache(tshirts)

    return (
      <View style={[Grid.grid, RawColors.light]}>
        <View style={[Grid.alignMiddle, Colors.border, Grid.container, { padding: 5 }]}>
          <Text style={{ fontWeight: 'bold', color: RawColors.dark, fontSize: 20 }}>
            Last T-shirst
          </Text>
        </View>
        <View
          style={[
            Grid.row,
            Grid.p0,
            Grid.alignMiddle,
            Grid.container,
            Colors.border,
            { flex: 0.3 },
          ]}
        >
          <Carrousel images={tshirtsWithAntiCache} handler={this.onImagePress} animated args={[]} />
        </View>
        <View
          style={[Grid.alignMiddle, Colors.border, Grid.container, { padding: 5, marginTop: 20 }]}
        >
          <Text style={{ fontWeight: 'bold', color: RawColors.dark, fontSize: 20 }}>
            Last Chats
          </Text>
        </View>
        <View
          style={[
            Grid.row,
            Grid.p0,
            Grid.alignMiddle,
            Grid.container,
            Colors.border,
            { flex: 0.7 },
          ]}
        >
          <LastChats
            ListEmptyComponent={(
              <View>
                <View style={{ alignContent: 'center' }}>
                  <Text>Not group yet!</Text>
                </View>
              </View>
            )}
            goToMessages={this.goToMessages}
            style={[Grid.grid, Colors.light]}
            chats={lastGroupsChats}
          />
        </View>
      </View>
    );
  }
}
export default Dashboard;
