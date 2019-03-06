import React, { Component } from 'react';
import R from 'ramda';
import {
  Image,
  View,
  StyleSheet,
  Style,
  Text,
  FlatList,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import Group from './group';
import Header from './header';
import GROUP_ADDED_SUBSCRIPTION from '../../../../../queries/group-added.subscription';
import { wsClient } from '../../../../../App';

const Moment = require('moment');

const background = require('../../../../../assets/icons/background.png');

class Groups extends Component {
  componentDidMount() {
    const { auth, subscribeToMore, subscribeToMessages } = this.props;
    if (!this.subscription) {
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
    }

    if (!this.messageSubscription) {
      this.messageSubscription = subscribeToMessages();
    }

    if (!this.reconnected) {
      this.reconnected = wsClient.onReconnected(() => {
        const { refetch } = this.props;
        refetch();
      }, this);
    }
  }

  goToMessages = group => () => {
    const {
      navigation: { navigate },
    } = this.props;
    navigate('Messages', { groupId: group.id, title: group.name });
  };

  goToNewGroup = () => {
    const {
      navigation: { navigate, setParams },
    } = this.props;
    navigate('Friends', { isGroup: true });
  };

  keyExtractor = item => item.id.toString();

  renderItem = ({ item }) => <Group group={item} goToMessages={this.goToMessages(item)} />;

  render() {
    const { userById } = this.props;
    if (!userById) return <ActivityIndicator />;
    if (!userById.groups) return <ActivityIndicator />;

    return (
      <ImageBackground source={background} style={{ flex: 1 }}>
        <FlatList
          ListEmptyComponent={(
            <View>
              <View style={{ alignContent: 'center', marginLeft: 150, marginVertical: 350 }}>
                <Text>Not group yet!</Text>
              </View>
            </View>
          )}
          data={userById.groups.sort((a, b) => a.id < b.id)}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        // ListHeaderComponent={() => <Header onPress={this.goToNewGroup} />}
        />
      </ImageBackground>
    );
  }
}

export default Groups;
/*

{
            new Moment(b.messages[0].createdAt).format('YYYYMMDD')
              - new Moment(a.messages[0].createdAt).format('YYYYMMDD');
            console.log(
              '.....',
              new Moment(a.messages[0].createdAt).format('YYYYMMDD'),
              '-',
              new Moment(b.messages[0].createdAt).format('YYYYMMDD'),
            );
          })
          */
