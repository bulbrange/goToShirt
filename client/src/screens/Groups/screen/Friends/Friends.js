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
} from 'react-native';
import Contacts from 'react-native-contacts';

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
    this.getcontact();
  }

  // eslint-disable-next-line react/sort-comp
  async requestContactPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' + 'so you can take awesome pictures.',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.setState({
          contactos: true,
        });
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
      }
    });
  }

  renderItem = ({ item, index }) => (
    <View style={{ flex: 1 }}>
      <Text>{item.givenName}</Text>
    </View>
  );

  render() {
    const { navigation, screenProps } = this.props;
    console.log('STATE', this.state.contacts);
    {
      // eslint-disable-next-line no-unused-expressions
      this.state.contactos ? null : this.requestContactPermission();
    }

    return (
      <View style={{ flex: 1 }}>
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
          />
        </View>
      </View>
    );
  }
}

export default Friends;
