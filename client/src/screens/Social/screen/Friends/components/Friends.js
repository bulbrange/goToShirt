/* eslint-disable consistent-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import R from 'ramda';
import {
  Alert,
  Image,
  View,
  StyleSheet,
  ImageBackground,
  PermissionsAndroid,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Contacts from 'react-native-contacts';
import Grid from '../../../../../styles/grid';
import Header from './header';
import IconButton from '../../../../../components/IconButton';

const background = require('../../../../../assets/icons/background.png');

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
    backgroundColor: '#819ca9',
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
      delay: 1000,
      isGroup: false,
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

  async componentDidUpdate() {
    const { users, auth } = this.props;

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
      await this.setState({ list, num: 1 });
    }
  }

  componentWillReceiveProps(prevProps, nextProps) {}

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

  handler = async (item) => {
    const { selected } = this.state;
    if (selected.length) {
      const oneMore = { item, ...selected };
      if (selected.includes(item)) {
        const oneLess = selected.filter(x => x != item);
        await this.setState({
          selected: oneLess,
        });
      } else {
        await this.setState({
          selected: oneMore,
        });
      }
    } else {
    }
  };

  longPress = async (item) => {
    const { selected, delay } = this.state;
    const oneMore = [...selected, item];
    if (selected.includes(item)) {
      const oneLess = selected.filter(x => x != item);
      await this.setState({
        selected: oneLess,
      });
    } else {
      await this.setState({
        selected: oneMore,
        delay: 0,
      });
    }
  };

  isSelected = (item) => {
    if (this.state.selected.includes(item)) {
      return [styles.chatsAlertOn];
    }
    return [styles.chatsAlert];
  };

  renderItem = ({ item }) => {
    const { auth } = this.props;
    if (auth.phone === item.phone) {
      return null;
    }
    return (
      <TouchableOpacity
        delayLongPress={this.state.delay}
        style={[this.isSelected(item), { height: 50 }, Grid.row]}
        onPress={() => console.log(item)}
        onLongPress={() => this.longPress(item)}
      >
        <Image
          size={25}
          handler={this.handler}
          style={[Grid.col1, Grid.justifyCenter, { borderRadius: 20, marginRight: 10 }]}
          source={{
            uri:
              'https://akm-img-a-in.tosshub.com/indiatoday/images/story/201707/chester1-story_647_072117100627.jpg',
          }}
        />
        <View style={[Grid.col10]}>
          <Text style={[styles.textChatAlert]}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderEmpty = () => <ActivityIndicator size="large" color="green" />;

  handlerCancel = async () => {
    await this.setState({
      selected: [],
      delay: 1000,
    });
    this.props.navigation.getParam('isGroup', 'false');
  };

  getContactList = (contacts, text) => {
    if (contacts.length == 0) return [];
    return contacts.filter(x => x.name.toLowerCase().includes(text.toLowerCase()));
  };

  goToFinalGroup = () => {
    const { navigation } = this.props;
    const { selected } = this.state;
    navigation.navigate('FinalGroup', { selected });
    this.setState({
      selected: [],
    });
  };

  isHeader = () => {
    if (this.state.selected.length || this.props.navigation.getParam('isGroup', 'false') === true) {
      if (this.props.navigation.getParam('isGroup', 'false') === true) {
        Alert.alert('Please selected your friend');
      }
      return <Header onPress={this.goToFinalGroup} onPressCancel={this.handlerCancel} />;
    }
    return (
      <View style={{ padding: 20, marginVertical: 15 }}>
        <Text textAlignVertical color="gray">
          Push longPress in your friend to create a new group
        </Text>
      </View>
    );
  };

  render() {
    // const {} = this.props;
    const { list, text, selected } = this.state;
    return (
      <ImageBackground source={background} style={{ flex: 1, padding: 5 }}>
        <View style={{ flex: 0.2 }}>
          <TextInput
            style={{ height: 60, borderColor: '#819ca9', borderBottomWidth: 1 }}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
            placeholder="  Search your friends here"
          />
        </View>
        <View style={{ flex: 0.8, marginTop: -20 }}>
          {this.isHeader()}
          <FlatList
            data={this.getContactList(list, text)}
            renderItem={this.renderItem}
            keyExtractor={item => item.phone.toString()}
            ListEmptyComponent={this.renderEmpty()}
          />
        </View>
      </ImageBackground>
    );
  }
}

export default Friends;
