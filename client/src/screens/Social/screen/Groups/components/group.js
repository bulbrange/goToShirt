import React from 'react';
import {
  StyleSheet, Text, TouchableHighlight, View, Image,
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  groupContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  groupName: {
    fontWeight: 'bold',
    flex: 0.7,
  },
  groupTextContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 6,
  },
  groupText: {
    color: '#8c8c8c',
  },
  groupImage: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  groupTitleContainer: {
    flexDirection: 'row',
  },
  groupLastUpdated: {
    flex: 0.3,
    color: '#8c8c8c',
    fontSize: 11,
    textAlign: 'right',
  },
  groupUsername: {
    paddingVertical: 4,
  },
});

// const formatCreatedAt = createdAt => moment(createdAt, new Date());

const Group = ({ goToMessages, group: { id, name, messages } }) => (
  <TouchableHighlight key={id} onPress={goToMessages}>
    <View style={styles.groupContainer}>
      <Image
        style={styles.groupImage}
        source={{ uri: 'https://www.geek.com/wp-content/uploads/2015/12/terminator-2-625x350.jpg' }}
      />
      <View style={styles.groupTextContainer}>
        <View style={styles.groupTitleContainer}>
          <Text style={styles.groupName}>{`${name}`}</Text>
          <Text style={styles.groupLastUpdated}>{moment(messages[0].createdAt).fromNow()}</Text>
        </View>
        <Text style={styles.groupUsername}>{messages[0].from.username}</Text>
        <Text style={styles.groupText} numberOfLines={1}>
          PEpetter
        </Text>
      </View>
      <Icon name="angle-right" size={24} color="#8c8c8c" />
    </View>
  </TouchableHighlight>
);

export default Group;