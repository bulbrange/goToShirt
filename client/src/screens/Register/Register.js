import React, { Component } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { graphql, compose } from 'react-apollo';
import Grid from '../../styles/grid';
import RegisterPanel from './RegisterPanel';
import MainHeader from '../../components/MainHeader';
import { NEW_USER, GET_USER } from '../../queries/user.queries';
import { samePass, goodEmail, msgInfo } from './validation';
import { client } from '../../App';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      repassword: '',
    };
  }

  userHandler = (text) => {
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

  buttonHandler = async () => {
    const {
      email, username, password, repassword,
    } = this.state;
    const passOk = samePass(password, repassword);
    let info = {
      title: 'Register fail...',
      msg: 'Your password dont match',
    };
    if (passOk) {
      const data = await client.query({
        query: GET_USER,
        variables: { email },
      }).then(res => res.data.user);
      console.log("<<<<", data);
      if(data === null && goodEmail(email)) this.props.addNewUser({ email, username, password }).then(res => console.log('RES>>>>', res));
      info = msgInfo(passOk, (data === null && goodEmail(email)));
    } 

    Alert.alert(info.title, info.msg, [{ text: 'Ok', onPress: () => console.log('OK Pressed') }], {
     cancelable: false,
    });
  };

  tabHandler = () => this.props.navigation.navigate('Login');

  render() {
    const {
      username, email, password, repassword,
    } = this.state;
    return (
      <View style={Grid.grid}>
        <MainHeader styles={{ flex: 0.2 }} />
        <ScrollView style={{ flex: 0.8 }}>
          <RegisterPanel
            states={{
              username,
              email,
              password,
              repassword,
            }}
            handlers={{
              userHandler: this.userHandler,
              emailHandler: this.emailHandler,
              passwordHandler: this.passwordHandler,
              repasswordHandler: this.repasswordHandler,
              buttonHandler: this.buttonHandler,
              tabHandler: this.tabHandler,
            }}
          />
        </ScrollView>
      </View>
    );
  }
}
const newUser = graphql(NEW_USER, {
  props: ({ mutate }) => ({
    addNewUser: ({ email, username, password }) => mutate({
      variables: { email, username, password },
    }),
  }),
});


export default compose(newUser)(Register);
