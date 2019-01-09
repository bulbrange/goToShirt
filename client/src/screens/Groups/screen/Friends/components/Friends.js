/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/sort-comp */
/* eslint-disable class-methods-use-this */
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
import RawColors from '../../../../../styles/colors';
import Grid from '../../../../../styles/grid';
import { client } from '../../../../../App';

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
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'crimsontext',
  },
});
class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      contactos: [],
      list: [],
      num: 0,
      text: '',
    };
  }

  async componentDidMount() {
    await this.getcontact();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { users } = this.props;
    const { contacts } = this.state;
    if (this.state.contacts.length && this.state.num === 0) {
      const listt = contacts
        .map((contact) => {
          if (contact.phoneNumbers.length) {
            const data = {
              name: contact.givenName,
              phone: contact.phoneNumbers[0].number,
            };
            return data;
          }
        })
        .filter(c => c !== undefined);

      const contactos = users.map(user => user.phone);

      const list = listt.filter(x => contactos.includes(x.phone));

      // for (let index = 0; index < listt.length; index++) {
      //   for (let j = 0; j < 1; j++) {
      //     if (listt[index].phone == contactos[j].phone) {
      //       list.push(listt[index]);
      //     } else if (listt[index].name.includes('GoToShirt')) {
      //       console.log('LISTTTTTT', listt[index]);
      //       console.log('CONTACTOS', contactos[j]);
      //     }
      //   }
      // }

      // eslint-disable-next-line react/no-unused-state
      this.setState({ list, num: 1, contactos });
      console.log('@NamePhone.....................', list);
    }
  }

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
    const { users } = this.props;
    Contacts.checkPermission(async (error, res) => {
      if (res === 'authorized') {
        await Contacts.getAll((err, contacts) => {
          // const theContacts = contacts.map(contact => contact.phoneNumbers);
          // console.log('JUST CONTACTS: ', theContacts);
          this.setState({ contacts });
        });
      } else {
        this.requestContactPermission();
        client.resetStore();
      }
    });
  }

  handler = (item) => {
    console.log('Hander', item);
  };

  renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.chatsAlert, { height: 40 }]}
      onPress={() => this.handler(item.name)}
    >
      <View style={[Grid.row]}>
        <Text style={[styles.textChatAlert]}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    const { navigation, screenProps, users } = this.props;
    const {
      list, contacts, contactos, text,
    } = this.state;
    console.log('USERS', users);
    console.log('CONTACTSSSSLIIIIIIIIIIISSSSSSSSS', contacts, list);
    // x => x.name.includes(text)
    return (
      <View style={{ flex: 1, paddingTop: 2 }}>
        <View style={{ flex: 0.2 }}>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          />
        </View>

        {list.length ? (
          <View style={{ flex: 0.8 }}>
            <FlatList
              data={list.filter(x => x.name.includes(text))}
              renderItem={this.renderItem}
              keyExtractor={index => index.toString()}
            />
          </View>
        ) : (
          <View style={{ flex: 0.8 }}>
            <Text>PEPEPEPE</Text>
          </View>
        )}
      </View>
    );
  }
}

export default Friends;
