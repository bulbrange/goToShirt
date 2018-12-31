/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-lone-blocks */
import React, { Component } from 'react';
import {
  Image,
  View,
  StyleSheet,
  PermissionsAndroid,
  FlatList,
  Style,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Contacts from 'react-native-contacts';
import RawColors from '../../../../styles/colors';
import Grid from '../../../../styles/grid';

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
  textChatAlert: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'crimsontext',
  },
});
class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      contactos: false,
      list: null,
      num: 0,
      text: '',
    };
  }

  componentDidMount() {
    // eslint-disable-next-line no-unused-expressions
    this.getcontact();
  }

  // eslint-disable-next-line react/sort-comp
  async requestContactPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'GoToShirt contact permison',
          message: 'Go to shirt needs permison',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the contacts');
      } else {
        console.log('contact permission denied');
      }
    } catch (err) {
      console.warn('>>>>>>>>>>>>>>', err);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async getcontact() {
    Contacts.checkPermission((error, res) => {
      if (res === 'authorized') {
        Contacts.getAll((err, contacts) => {
          this.setState({ contacts });
        });
      } else {
        this.requestContactPermission();
      }
    });
  }

  handler = ({ itemm }) => {
    console.log(itemm.givenName);
  };

  renderItem = ({ item, index }) => (
    <TouchableOpacity style={[styles.chatsAlert, { height: 40 }]}>
      <View style={[Grid.row]}>
        <Text style={[styles.textChatAlert]}>{item.givenName}</Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    const { navigation, screenProps } = this.props;
    console.log('STATE', this.state);

    return (
      <View style={{ flex: 1, paddingTop: 2 }}>
        <View style={{ flex: 0.2 }}>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          />
        </View>

        <View style={{ flex: 0.8 }}>
          <FlatList
            data={this.state.contacts.filter(x => x.givenName.includes(this.state.text))}
            renderItem={a => this.renderItem(a)}
            keyExtractor={(item, index) => index.toString()}
            onPress={item => this.handler(index)}
          />
        </View>
      </View>
    );
  }
}

export default Friends;
