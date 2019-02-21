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
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Grid from '../../../../../styles/grid';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  detailsContainer: {
    padding: 20,
    flexDirection: 'row',
  },
  imageContainer: {
    paddingRight: 20,
    alignItems: 'center',
    borderRadius: 40,
  },
  default: {
    width: 200,
    height: 204,
    borderRadius: 100,
  },

  inputContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  input: {
    color: 'black',
    height: 75,
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
});

class FinalGroup extends Component {
  constructor(props) {
    super(props);
    const { selected } = props.navigation.state.params;
    this.state = {
      selected,
      name: '',
    };
  }

  componentDidMount() {
    const { name, selected } = this.state;

    console.log('PRORPS USER', this.props.users);
  }

  // componentWillUpdate(nextProps, nextState) {
  //   const { name, selected } = this.state;
  //   if ((nextState.selected.length && nextState.name) !== (selected.length && name)) {
  //     this.refreshNavigation(nextState.selected.length && nextState.name);
  //   }
  // }

  // remove = (user) => {
  //   const { selected } = this.state;
  //   // eslint-disable-next-line react/destructuring-assignment
  //   const { remove } = this.props.navigation.state.params;
  //   const index = selected.indexOf(user);
  //   if (~index) {
  //     this.setState(
  //       {
  //         selected: selected.filter((_, i) => i !== index),
  //       },
  //       () => remove(user),
  //     );
  //   }
  // };

  // create = () => {
  //   const { createGroup, navigation } = this.props;
  //   const { name, selected } = this.state;

  //   createGroup({
  //     name,
  //     userId: 1, // fake user for now
  //     userIds: R.map(R.prop('id'), selected),
  //   })
  //     .then((res) => {
  //       navigation.dispatch(goToNewGroup(res.data.createGroup));
  //     })
  //     .catch((error) => {
  //       Alert.alert('Error Creating New Group', error.message, [{ text: 'OK', onPress: () => {} }]);
  //     });
  // };

  // refreshNavigation(ready) {
  //   const { navigation } = this.props;
  //   navigation.setParams({
  //     mode: ready ? 'ready' : undefined,
  //     create: this.create,
  //   });
  // }

  render() {
    console.log('SELECTED', this.state.selected);
    return (
      <View style={(styles.container, { paddingTop: 20 })}>
        <View style={Grid.row}>
          <TouchableOpacity style={styles.imageContainer}>
            <Image
              style={styles.default}
              source={{
                uri:
                  'https://66.media.tumblr.com/ce026fc9df734bec5d042c0807250bb3/tumblr_mxpizbXrGq1s3tw3go1_400.gif',
              }}
            />
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
          </View>
        </View>
      </View>
    );
  }
}

export default FinalGroup;
