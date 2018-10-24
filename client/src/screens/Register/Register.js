import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { graphql, compose } from 'react-apollo';
import Grid from '../../styles/grid';
import RegisterPanel from './RegisterPanel';
import MainHeader from '../../components/MainHeader';
import USER_QUERY from '../../queries/user.queries';

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

  buttonHandler = () => {
    this.props.addNewUser({
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
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
const newUser = graphql(USER_QUERY, {
  props: ({ mutate }) => ({
    addNewUser: (email, username, password) => mutate({
      variables: { email, username, password },
    }),
  }),
});
export default compose(newUser)(Register);
