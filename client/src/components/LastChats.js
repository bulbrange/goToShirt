import React, { Component } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
} from 'react-native';
import Grid from '../styles/grid';
import { RawColors, Colors } from '../styles/colors';
import IconButton from './IconButton';

const styles = StyleSheet.create({
  chatsAlert: {
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: 'grey',
    justifyContent: 'center',
    padding: 2,
  },
  textChatAlert: {
    color: RawColors.dark,
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'crimsontext',
  },
});

class LastChats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      push: false,
    };
  }

  keyExtractor = (item, index) => index.toString();

  handler = () => {
    console.log('Pepetter');
  };

  renderItem = ({ item }) => {
    const { text } = item;
    return (
      <TouchableOpacity style={[styles.chatsAlert, { height: 40 }]} onPress={this.handler}>
        <View style={[Grid.row]}>
          <IconButton
            name="users"
            size={25}
            handler={this.handler}
            style={[Grid.col4, Grid.justifyCenter]}
          />
          <View style={([Grid.col8, Grid.justifyCenter], { marginLeft: 10 })}>
            <Text style={styles.textChatAlert}>{text}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { chats } = this.props;
    return (
      <View style={[Grid.grid]}>
        <FlatList data={chats} keyExtractor={this.keyExtractor} renderItem={this.renderItem} />
      </View>
    );
  }
}

export default LastChats;
