import R from 'ramda';
// import { Buffer } from 'buffer';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
  ActivityIndicator,
} from 'react-native';
import React, { Component } from 'react';
import randomColor from 'randomcolor';
// import randomColor from 'randomcolor';

// import { wsClient } from 'chatty/src/app';
// import Logo from 'chatty/src/components/logo';
// import MESSAGE_ADDED_SUBSCRIPTION from 'chatty/src/graphql/message-added.subscription';

import Message from './message';
import MessageInput from './MessageInput';

const background = require('../../../../../assets/icons/background.png');

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: '#e5ddd5',
    flex: 1,
    flexDirection: 'column',
  },
  titleWrapper: {
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleImage: {
    marginRight: 6,
    width: 32,
    height: 32,
    borderRadius: 16,
  },
});

class Messages extends Component {
  /* static navigationOptions = ({ navigation }) => {
    const { state, navigate } = navigation;

    const goToGroupDetails = () => navigate('GroupDetails', {
      id: state.params.groupId,
      title: state.params.title,
    });

    return {
      headerTitle: (
        <TouchableOpacity style={styles.titleWrapper} onPress={goToGroupDetails}>
          <View style={styles.title}>
            <Logo style={styles.titleImage} />
            <Text>{state.params.title}</Text>
          </View>
        </TouchableOpacity>
      ),
    };
  }; */

  constructor(props) {
    super(props);
    const usernameColors = {};
    if (props.group && props.group.users) {
      props.group.users.forEach((user) => {
        usernameColors[user.username] = randomColor();
      });
    }
    this.state = {
      usernameColors,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { usernameColors } = this.state;
    const newUsernameColors = {};
    // check for new messages
    if (nextProps.group) {
      if (nextProps.group.users) {
        // apply a color to each user
        nextProps.group.users.forEach((user) => {
          newUsernameColors[user.username] = usernameColors[user.username] || randomColor();
        });
      }

      // we don't resubscribe on changed props
      // because it never happens in our app
      /* if (!this.subscription) {
        this.subscription = nextProps.subscribeToMore({
          document: MESSAGE_ADDED_SUBSCRIPTION,
          variables: {
            userId: 1, // fake the user for now
            groupIds: [nextProps.navigation.state.params.groupId],
          },
          updateQuery: (previousResult, { subscriptionData }) => {
            if (!subscriptionData.data) return previousResult;

            const newMessage = subscriptionData.data.messageAdded;

            const edgesLens = R.lensPath(['group', 'messages', 'edges']);

            return R.over(
              edgesLens,
              R.prepend({
                __typename: 'MessageEdge',
                node: newMessage,
                cursor: Buffer.from(newMessage.id.toString()).toString('base64'),
              }),
              previousResult,
            );
          },
        });
      } */

      /* if (!this.reconnected) {
        this.reconnected = wsClient.onReconnected(() => {
          const { refetch } = this.props;
          refetch(); // check for any data lost during disconnect
        }, this);
      } */

      this.setState({
        usernameColors: newUsernameColors,
      });
    }
  }

  onEndReached = () => {
    const { loadingMoreEntries } = this.state;
    const { loadMoreEntries, message } = this.props;
    if (!loadingMoreEntries && message.pageInfo.hasNextPage) {
      this.setState({
        loadingMoreEntries: true,
      });
      loadMoreEntries().then(() => {
        this.setState({
          loadingMoreEntries: false,
        });
      });
    }
  };

  keyExtractor = item => item.node.id.toString();

  renderItem = ({ item: edge }) => {
    const { usernameColors } = this.state;
    const { auth } = this.props;
    const message = edge.node;
    return (
      <Message
        color={usernameColors[message.from.username]}
        isCurrentUser={message.from.id === auth.id} // for now until we implement auth
        message={message}
      />
    );
  };

  send = (text) => {
    const { createMessage, navigation, auth } = this.props;
    createMessage({
      message: {
        groupId: navigation.state.params.groupId, // navigation.state.params.groupId,
        userId: auth.id, // faking the user for now
        text,
      },
    }).then(() => {
      this.flatList.scrollToIndex({ index: 0, animated: true });
    });
  };

  render() {
    const { message } = this.props;
    if (!message) {
      return <ActivityIndicator />;
    }

    return (
      <ImageBackground source={background} style={styles.container}>
        <FlatList
          ref={(ref) => {
            this.flatList = ref;
          }}
          inverted
          data={message.edges}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ListEmptyComponent={(
            <View>
              <View style={{ alignContent: 'center', marginLeft: 150, marginVertical: 350 }}>
                <Text>Not messages yet</Text>
              </View>
            </View>
)}
          onEndReachedThreshold={0.1}
          onEndReached={this.onEndReached}
        />
        <MessageInput send={this.send} />
      </ImageBackground>
    );
  }
}

export default Messages;
