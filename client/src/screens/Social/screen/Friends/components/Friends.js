/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/sort-comp */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-lone-blocks */
import React, { Component } from 'react';
import R from 'ramda';

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
  ActivityIndicator,
} from 'react-native';
import Contacts from 'react-native-contacts';
import { from } from 'apollo-link';
import RawColors from '../../../../../styles/colors';
import Grid from '../../../../../styles/grid';
import Header from './header';
import IconButton from '../../../../../components/IconButton';

const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

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
  chatsAlertOn: {
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(74,98,109, 0.5)',
    justifyContent: 'center',
    padding: 2,
    backgroundColor: '#29434e',
    color: 'white',
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
      list: [],
      num: 0,
      text: '',
      selected: [],
      delay: 2500,
    };
  }

  async componentDidMount() {
    await this.getcontact();
  }

  formatPhoneNumber(phoneNumber) {
    try {
      const number = phoneUtil.parseAndKeepRawInput(phoneNumber, 'ES');
      return number.getNationalNumber().toString();
    } catch (error) {}
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { users } = this.props;
    if (!users) {
      return <ActivityIndicator size="large" color="green" />;
    }
    const { contacts } = this.state;
    if (this.state.contacts.length && this.state.num === 0) {
      const listt = contacts
        .map((contact) => {
          if (contact.phoneNumbers.length) {
            const data = {
              name: contact.givenName,
              phone: this.formatPhoneNumber(contact.phoneNumbers[0].number),
            };
            return data;
          }
        })
        .filter(c => c !== undefined);

      const contactos = users.map(user => user.phone);
      const listRaw = listt.filter(x => contactos.includes(x.phone));
      const list = R.uniqBy(R.prop('phone'), listRaw);
      this.setState({ list, num: 1 });
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
        this.getcontact();
      } else {
        console.log('contact permission denied');
      }
    } catch (err) {
      console.warn('>>>>>>>>>>>>>>', err);
    }
  }

  async getcontact() {
    Contacts.checkPermission(async (error, res) => {
      if (res === 'authorized') {
        await Contacts.getAll((err, contacts) => {
          this.setState({ contacts });
        });
      } else {
        this.requestContactPermission();
      }
    });
  }

  handler = (item) => {
    const { selected } = this.state;
    const oneMore = { item, ...selected };

    this.setState({
      selected: oneMore,
    });
  };

  longPress = async (item) => {
    const { selected, delay } = this.state;
    const oneMore = [...selected, item];

    await this.setState({
      selected: oneMore,
      delay: 0,
    });
    console.log('...........][][][][][][][]', selected, oneMore);
  };

  isSelected = (item) => {
    if (this.state.selected.includes(item)) {
      return [styles.chatsAlertOn];
    }
    return [styles.chatsAlert];
  };

  renderItem = ({ item }) => (
    <TouchableOpacity
      delayLongPress={this.state.delay}
      style={[this.isSelected(item), { height: 50 }, Grid.row]}
      onPress={() => this.handler(item.name)}
      onLongPress={() => this.longPress(item)}
    >
      <View style={[Grid.col10]}>
        <Text style={[styles.textChatAlert]}>{item.name}</Text>
      </View>
      {this.state.selected.length ? (
        <View style={[Grid.col2]}>
          <IconButton name="check" size={20} handler={this.goEditor} />
        </View>
      ) : null}
    </TouchableOpacity>
  );

  renderEmpty = () => <ActivityIndicator size="large" color="green" />;

  getContactList = (contacts, text) => {
    if (contacts.length == 0) return [];
    return contacts.filter(x => x.name.toLowerCase().includes(text.toLowerCase()));
  };

  isHeader = () => {
    if (this.state.selected.length) {
      return <Header onPress={() => console.log('Header')} />;
    }
    return null;
  };

  render() {
    // const {} = this.props;
    const { list, text, selected } = this.state;
    console.log('>>>>>>>>>>SELECTED>>>>>>', selected);
    return (
      <View style={{ flex: 1, paddingTop: 2 }}>
        <View style={{ flex: 0.2, marginBottom: -10 }}>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          />
        </View>
        <View style={{ flex: 0.8, marginTop: -50 }}>
          {selected.length ? <Header onPress={() => console.log('Header')} /> : null}
          <FlatList
            data={this.getContactList(list, text)}
            renderItem={this.renderItem}
            keyExtractor={index => index.toString()}
            ListEmptyComponent={this.renderEmpty()}
            // ListHeaderComponent={this.isHeader()}
          />
        </View>
      </View>
    );
  }
}

export default Friends;
