import React, { Component } from 'react';
import {
  Image, View, StyleSheet, Style, Text, FlatList, ActivityIndicator,
} from 'react-native';
import Group from './group';
import Header from './header';

class Groups extends Component {
  goToMessages = group => () => {
    console.log('Go To messages');
    const {
      navigation: { navigate },
    } = this.props;
    navigate('Messages', { groupId: group.id, title: group.name });
  };

  keyExtractor = item => item.id.toString();

  renderItem = ({ item }) => <Group group={item} goToMessages={this.goToMessages(item)} />;

  render() {
    const { userById } = this.props;
    if (!userById) return <ActivityIndicator />;

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={userById.groups}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          ListHeaderComponent={() => <Header onPress={() => console.log('Header')} />}
        />
      </View>
    );
  }
}

export default Groups;
