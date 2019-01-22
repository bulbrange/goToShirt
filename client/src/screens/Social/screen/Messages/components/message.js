import moment from 'moment';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  message: {
    flex: 0.8,
    backgroundColor: 'white',
    borderRadius: 6,
    marginHorizontal: 16,
    marginVertical: 2,
    paddingHorizontal: 8,
    paddingVertical: 6,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
    },
  },
  myMessage: {
    backgroundColor: '#dcf8c6',
  },
  messageUsername: {
    color: 'red',
    fontWeight: 'bold',
    paddingBottom: 12,
  },
  messageTime: {
    color: '#8c8c8c',
    fontSize: 11,
    textAlign: 'right',
  },
  messageSpacer: {
    flex: 0.2,
  },
});
class Message extends PureComponent {
  render() {
    return (
      <View>
        <Text>ESTOY EN MENSAGES</Text>
      </View>
    );
  }
}
/*
const { color, message, isCurrentUser } = this.props;
const date = moment(message.createdAt).fromNow();
      <View key={message.id} style={styles.container}>
        {isCurrentUser ? <View style={styles.messageSpacer} /> : undefined}
        <View style={[styles.message, isCurrentUser && styles.myMessage]}>
          <Text style={[styles.messageUsername, { color }]}>{message.from.username}</Text>
          <Text>{message.text}</Text>
          <Text style={styles.messageTime}>{date}</Text>
        </View>
        {!isCurrentUser ? <View style={styles.messageSpacer} /> : undefined}
      </View>

*/
export default Message;
