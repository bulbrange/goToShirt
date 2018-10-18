import React, { Component } from 'react';
import { Image, View } from 'react-native';
import Grid from '../styles/grid';
import LogginPanel from './components/LogginPanel';

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
    const textInputAttrs = [
      {
        value: username,
        placeholder: 'User',
        handler: this.userNameHandler,
        pass: false,
      },
      {
        value: password,
        placeholder: 'Password',
        handler: this.passwordHandler,
        pass: true,
        styles: { marginBottom: 80 },
      },
    ];
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
        <LogginPanel attrs={textInputAttrs} />
      </View>
    );
  }
}

export default Logging;
