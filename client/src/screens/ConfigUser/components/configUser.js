import React, { Component } from 'react';
import { View, ImageBackground } from 'react-native';
import ConfigViewUser from '../../../components/ConfigViewUser';
import Indicator from '../../../components/Indicator';
import { Grid } from '../../../styles/grid';

const background = require('../../../assets/icons/background.png');

class ConfigUserView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: true,
      visible: true,
      avatar: '',
      username: '',
      email: '',
    };
  }

  async componentDidMount() {
    const { userById } = this.props;
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.userById) {
      await this.setState({
        avatar: nextProps.userById.avatar,
        username: nextProps.userById.username,
        email: nextProps.userById.email,
      });
    }
  }

  render() {
    const { userById } = this.props;
    const { avatar, username, email } = this.state;
    if (!userById) return <Indicator />;
    return (
      <ImageBackground source={background} style={[Grid.grid]}>
        <ConfigViewUser
          editable
          username={userById.username}
          email={userById.email}
          avatar={userById.avatar}
        />
      </ImageBackground>
    );
  }
}

export default ConfigUserView;
