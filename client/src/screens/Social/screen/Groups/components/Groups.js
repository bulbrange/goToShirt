import React, { Component } from 'react';
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

const Moment = require('moment');

const background = require('../../../../../assets/icons/background.png');

class Groups extends Component {
  goToMessages = group => () => {
    console.log('Go To messages');
    const {
      navigation: { navigate },
    } = this.props;
    navigate('Messages', { groupId: group.id, title: group.name });
  };

  goToNewGroup = () => {
    console.log('Go To messages');
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
    console.log('PPPPPPPPPPPPPP', userById.groups);
    return (
      <ImageBackground source={background} style={{ flex: 1 }}>
        <FlatList
          data={userById.groups}
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
