import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import moment from 'moment';
import Grid from '../styles/grid';
import { RawColors, Colors } from '../styles/colors';
import IconButton from './IconButton';

const styles = StyleSheet.create({
  chatsAlert: {
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(74,98,109, 0.5)',
    justifyContent: 'center',
    padding: 2,
    backgroundColor: 'rgba(74,98,109, 0.03)',
    borderRadius: 7,
    margin: 5,
  },
  textAlert: {
    color: RawColors.dark,
    fontSize: 12,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontFamily: 'crimsontext',
    marginRight: 20,
  },
  textDateAlert: {
    color: RawColors.light,
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'crimsontext',
    textAlign: 'right',
  },
  textChatAlert: {
    color: RawColors.dark,
    fontSize: 15,
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

  renderEmpty = () => <ActivityIndicator size="large" color="green" />;

  renderItem = ({ item }) => {
    const date = moment(item.messages.createdAt).fromNow();
    console.log('date:', item);
    const { goToMessages } = this.props;
    let text = '';

    if (item.messages.length) {
      text = item.messages[0].text.length > 30
        ? `${item.messages[0].text.substr(0, 30)}...`
        : item.messages[0].text;

      // const { text } = item;
      return (
        <TouchableOpacity style={[styles.chatsAlert]} onPress={goToMessages(item)}>
          <View style={[Grid.row]}>
            <View style={[Grid.col2]}>
              <View
                style={{
                  flex: 1,
                  width: 50,
                  borderRadius: 10000,
                  overflow: 'hidden',
                }}
              >
                <Image
                  style={{ flex: 1, width: null, height: null }}
                  resizeMode="cover"
                  handler={this.handler}
                  source={{
                    uri: 'https://www.geek.com/wp-content/uploads/2015/12/terminator-2-625x350.jpg',
                  }}
                />
              </View>
            </View>
            <View style={[Grid.col10]}>
              <Text style={styles.textChatAlert}>{item.name}</Text>
              <View style={[Grid.row]}>
                <Text style={styles.textAlert}>{text}</Text>
                <Text style={styles.textDateAlert}>{date}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
    return null;
  };

  render() {
    const { chats } = this.props;
    return (
      <View style={[Grid.grid]}>
        <FlatList
          data={chats.slice(0, 10)}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ListEmptyComponent={(
            <View>
              <View style={{ alignContent: 'center', marginLeft: 150, marginVertical: 350 }}>
                <Text>Not group yet!</Text>
              </View>
            </View>
)}
        />
      </View>
    );
  }
}

export default LastChats;
