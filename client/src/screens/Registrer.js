import React, { Component } from 'react';
import {
  TextInput, Image, Button, StyleSheet, View, Text,
} from 'react-native';
import Grid from '../styles/grid';

const styles = StyleSheet.create({
  textInput: {
    marginTop: 20,
    marginBottom: 15,
    height: 60,
    fontSize: 20,
    borderColor: 'gray',
    borderBottomWidth: 1,
  },
  inputWrapper: {
    padding: 20,
  },
  inputbackground: {
    backgroundColor: '#E0E0E0',
  },
});
class Registrer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      repassword: '',
    };
  }

  userNameHandler = (text) => {
    this.setState({
      username: text,
    });
  };

  emailHandler = (text) => {
    this.setState({
      email: text,
    });
  };

  passwordHandler = (text) => {
    this.setState({
      password: text,
    });
  };

  repasswordHandler = (text) => {
    this.setState({
      repassword: text,
    });
  };

  render() {
    const { username, password } = this.state;
    return (
      <View style={Grid.grid}>
        <View style={[Grid.row, Grid.p0, { flex: 0.4 }]}>
          <Image
            style={{ flex: 1, width: null, height: null }}
            source={{
              uri: 'https://dz2cdn4.dzone.com/storage/article-thumb/210027-thumb.jpg',
            }}
          />
        </View>
        <View style={[Grid.row, Grid.p0, { flex: 0.6 }]}>
          <View style={Grid.grid}>
            <View style={[Grid.row, Grid.p0]}>
              <View style={[Grid.col12, styles.inputWrapper]}>
                <TextInput
                  style={[styles.textInput]}
                  placeholder="User"
                  onChangeText={text => this.userNameHandler(text)}
                  value={username}
                />
              </View>
            </View>
            <View style={[Grid.row, Grid.p0, { marginBottom: 35 }]}>
              <View style={[Grid.col12, styles.inputWrapper]}>
                <TextInput
                  style={styles.textInput}
                  placeholder="email"
                  onChangeText={text => this.emailHandler(text)}
                  value={password}
                />
              </View>
            </View>
            <View style={[Grid.row, Grid.p0, { marginBottom: 35 }]}>
              <View style={[Grid.col12, styles.inputWrapper]}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Password"
                  onChangeText={text => this.passwordHandler(text)}
                  secureTextEntry
                  value={password}
                />
              </View>
            </View>
            <View style={[Grid.row, Grid.p0, { marginBottom: 35 }]}>
              <View style={[Grid.col12, styles.inputWrapper]}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Re-Password"
                  onChangeText={text => this.repasswordHandler(text)}
                  secureTextEntry
                  value={password}
                />
              </View>
            </View>
            <View style={[Grid.row, Grid.p0]}>
              <View style={[Grid.col12, styles.inputWrapper]}>
                <Button onPress={() => console.log('JANDER')} title="Log in" color="#D32B2B" />
              </View>
            </View>
            <View style={[Grid.row, Grid.p0]}>
              <View style={[Grid.col12]}>
                <Text style={{ textAlign: 'center' }} onPress={() => console.log('works')}>
                  Didn´t registered yet?
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default Registrer;
