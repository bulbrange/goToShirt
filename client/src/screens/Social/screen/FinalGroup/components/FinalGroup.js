import React, { Component } from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import R from 'ramda';
import { StackActions, NavigationActions } from 'react-navigation';
import IconButton from '../../../../../components/IconButton';

import Grid from '../../../../../styles/grid';
import { RawColors } from '../../../../../styles/colors';

// const goToNewGroup = group => StackActions.reset({
//   index: 1,
//   actions: [
//     NavigationActions.navigate({ routeName: 'Main' }),
//     NavigationActions.navigate({
//       routeName: 'Messages',
//       params: { groupId: group.id, title: group.name },
//     }),
//   ],
// });
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  default: {
    width: 100,
    height: 100,
    borderRadius: 30,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainerWrapper: {
    alignSelf: 'center',
  },
  detailsContainer: {
    backgroundColor: '#FFF',
    padding: 10,
    flexDirection: 'row',
    borderColor: RawColors.dark,
  },
  imageContainer2: {
    paddingRight: 20,
    alignItems: 'center',
  },
  imageContainer: {
    width: 75,
    height: 75,
    marginRight: 5,
    borderColor: 'lightgray',
    borderRadius: 35,
    borderStyle: 'solid',
    borderWidth: 1.5,
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  input: {
    color: 'black',
    height: 35,
  },
  inputBorder: {
    borderColor: '#dbdbdb',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingVertical: 8,
  },
  inputInstructions: {
    paddingTop: 6,
    color: '#777',
    fontSize: 12,
  },
  selected: {
    flexDirection: 'row',
  },
  loading: {
    justifyContent: 'center',
    flex: 1,
  },
  navIcon: {
    color: 'blue',
    fontSize: 18,
    paddingTop: 2,
  },
  participants: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    backgroundColor: '#dbdbdb',
    color: '#777',
  },
  name: {
    textAlign: 'center',
    color: RawColors.dark,
  },
  buttonConfirm: {
    justifyContent: 'center',
    alignItems: 'center',
    left: width / 2,
    top: 10,
    width: 70,
    height: 70,
  },
});

class FinalGroup extends Component {
  constructor(props) {
    super(props);
    const { selected } = props.navigation.state.params;
    this.state = {
      selected,
      usersFriend: [],
      name: '',
    };
  }

  async componentDidMount() {
    const { name, selected } = this.state;
    const { users } = this.props;
    console.log('PRORPS USER', users);
    const usersFriend = users
      .map((x) => {
        const verdad = selected.filter(y => x.phone === y.phone);
        if (verdad.length) {
          return x.id;
        }
      })
      .filter(x => x != undefined);
    await this.setState({
      usersFriend,
    });
    console.log('USERSFRIEND', usersFriend);
  }

  confirmGroup = () => {
    const { usersFriend, name } = this.state;
    const {
      auth, newGroup, createMessage, navigation,
    } = this.props;

    if (name === '') {
      return Alert.alert('You forget something!', 'You need choose a name for your group!!');
    }
    const group = {
      name,
      userById: usersFriend,
      userId: auth.id,
    };
    newGroup(group)
      .then(async (res) => {
        console.log('RES', res);
        const name = res.data.newGroup.name;
        createMessage({
          message: {
            groupId: res.data.newGroup.id, // navigation.state.params.groupId,
            userId: auth.id, // faking the user for now
            text: `Te invito a que participes en el grupo ${name} y entre todos editemos una Super Tshir!`,
          },
        });
        navigation.navigate('Groups');
      })
      .catch(err => console.log('........', err));
  };

  renderItem = ({ item }) => (
    <View style={styles.imageContainerWrapper}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="cover"
          style={{
            flex: 1,
          }}
          source={{
            uri: 'https://www.geek.com/wp-content/uploads/2015/12/terminator-2-625x350.jpg',
          }}
        />
      </View>
      <Text style={styles.name}>{item.username}</Text>
    </View>
  );

  render() {
    const { name, selected, usersFriend } = this.state;
    const { users } = this.props;
    console.log('@@@@@PROPS@@@@@@', this.props);

    console.log('SELECTED', selected, 'USERFRIEND', usersFriend);
    return (
      <View style={(styles.container, { paddingHorizontal: 5 })}>
        <View style={styles.detailsContainer}>
          <TouchableOpacity style={styles.imageContainer2}>
            <View>
              <Image
                style={styles.default}
                source={{
                  uri:
                    'https://akm-img-a-in.tosshub.com/indiatoday/images/story/201707/chester1-story_647_072117100627.jpg',
                }}
              />
            </View>
            <Text>edit</Text>
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <View style={styles.inputBorder}>
              <TextInput
                autoFocus
                onChangeText={name => this.setState({ name })}
                placeholder="Group Name"
                style={styles.input}
              />
            </View>
            <View style={styles.buttonConfirm}>
              <IconButton name="user-check" size={35} handler={this.confirmGroup} />
            </View>
          </View>
        </View>
        <View style={{ marginTop: 15 }}>
          <FlatList
            keyExtractor={index => index.toString()}
            renderItem={this.renderItem}
            data={usersFriend}
            horizontal
          />
        </View>
      </View>
    );
  }
}

export default FinalGroup;
