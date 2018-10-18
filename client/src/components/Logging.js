import React, { Component } from 'react';
import {
  TextInput, Image, Button, StyleSheet,
} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';

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
    flex: 1,
    padding: 20,
    alignSelf: 'center',
  },
  inputbackground: {
    backgroundColor: '#E0E0E0',
  },
});
class Logging extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  userNameHandler = (text) => {
    this.setState({
      username: text,
    });
  };

  passwordHandler = (text) => {
    this.setState({
      password: text,
    });
  };

  render() {
    const { username, password } = this.state;
    return (
      <Grid>
        <Row size={2}>
          <Image
            style={{ flex: 1, width: null, height: null }}
            source={{
              uri: 'https://dz2cdn4.dzone.com/storage/article-thumb/210027-thumb.jpg',
            }}
          />
        </Row>

        <Row size={1} style={styles.inputbackground}>
          <Col style={styles.inputWrapper}>
            <TextInput
              style={[styles.textInput]}
              placeholder="User"
              onChangeText={text => this.userNameHandler(text)}
              value={username}
            />
          </Col>
        </Row>
        <Row size={1} style={styles.inputbackground}>
          <Col style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              onChangeText={text => this.passwordHandler(text)}
              secureTextEntry
              value={password}
            />
          </Col>
        </Row>
        <Row size={1} style={styles.inputbackground}>
          <Col style={styles.inputWrapper}>
            <Button onPress={() => console.log('JANDER')} title="Log in" color="#D32B2B" />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Logging;
