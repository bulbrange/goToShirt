/* eslint-disable space-before-blocks */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import ConfigViewUser from '../../../components/ConfigViewUser';

class ConfigUserView extends Component {
  constructor(props){
    super(props);
    this.state = {
      edit: true,
      visible: true,
      avatar: '',
      userName: '',
      email: '',
    };
  }

  async componentDidMount(){
    const { userById } = this.props;
  }

  async componentWillReceiveProps(nextProps){
    console.log('@next', nextProps);

    if (nextProps.userById) {
      await this.setState({
        avatar: nextProps.userById.avatar,
        username: nextProps.userById.username,
        email: nextProps.userById.email,
      });
    }
  }

  render(){
    console.log('@USER..................>>>>>>>>>>>>>>>>', this.props);
    const { userById } = this.props;
    const { avatar, username, email } = this.state;
    if( !userById ) return (<ActivityIndicator size="large" color="red" />);
    return(
      <View>
        <ConfigViewUser  editable={true} username={username}  email={email} />
      </View>
    );
  }
}

export default ConfigUserView;
