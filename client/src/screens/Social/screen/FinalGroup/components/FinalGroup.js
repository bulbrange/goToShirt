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
  detailsContainer: {
    backgroundColor: '#FFF',
    padding: 10,
    flexDirection: 'row',
    borderColor: RawColors.dark,
  },
  imageContainer: {
    paddingRight: 20,
    alignItems: 'center',
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
          return x;
        }
      })
      .filter(x => x != undefined);
    await this.setState({
      usersFriend,
    });
    console.log('USERSFRIEND', usersFriend);
  }

  renderItem = ({ item }) => (
    <View style={Grid.grid}>
      <Image
        size={50}
        style={[Grid.col12, Grid.justifyCenter, { borderRadius: 20, marginRight: 10 }]}
        source={{
          uri: 'https://www.geek.com/wp-content/uploads/2015/12/terminator-2-625x350.jpg',
        }}
      />
    </View>
  );

  render() {
    const { name, selected, usersFriend } = this.state;
    const { users } = this.props;

    console.log('SELECTED', selected);
    return (
      <View style={(styles.container, { paddingHorizontal: 5 })}>
        <View style={styles.detailsContainer}>
          <TouchableOpacity style={styles.imageContainer}>
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
              <IconButton name="user-check" size={35} />
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
