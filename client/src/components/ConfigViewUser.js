import React, { Component } from 'react';
import {
  View, StyleSheet, Text, Image, ActivityIndicator, Button, ImageBackground
} from 'react-native';
import FormInput from './FormInput';
import FormButton from './FormButton';
import Grid from '../styles/grid';

const styles = StyleSheet.create({
  userImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },

  formEdit: {
    height: 20,
  },

  titleConfig: {
    marginTop: 210,
    marginLeft: 10,
    fontSize: 32,
    color: '#FFF',
    fontWeight: 'bold',
  },
  textDelete: {
    marginTop: 5,
    justifyContent: 'center',
    backgroundColor: '#ea0202',
    color: '#FFF',
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 20,
    width: 150,
  },
});

class ConfigViewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      change: false,
      editable: true,
    };
  }

  async componentDidMount() {
    const { userById } = this.props;
    if (userById) {
      await this.setState({
        avatar: userById.avatar,
        username: userById.username,
        email: userById.email,
      });
    }
  }

  async componentWillReceiveProps(nextProps) {
    console.log('@next', nextProps);
    if (nextProps.userById) {
      await this.setState({
        avatar: nextProps.userById.avatar,
        username: nextProps.userById.username,
        email: nextProps.userById.email,
      });
    }
  }

  firtsMayus = string => string.charAt(0).toUpperCase() + string.slice(1);

  checkChange = () => {
    const { change } = this.state;
    this.setState({ change: !change });
  };

  render() {
    const {
      avatar, editable, username, email,
    } = this.props;
    console.log('STATE', this.state);
    return (
      <View style={[Grid.grid, Grid.p0]}>
        <ImageBackground source={{ uri: avatar }} style={[Grid.row, Grid.p0, styles.userImage, { flex: 0.4 }]}>
          <Text style={styles.titleConfig}>{this.firtsMayus(username)}</Text>
        </ImageBackground>
        <View style={[Grid.row, Grid.p0, { flex: 0.6 }]}>
          <View style={[Grid.grid]}>
            <View style={[Grid.row, { flex: 0.7 }]}>
              <View style={[Grid.grid, Grid.alignMiddle]} >
                <FormInput editable={editable} placeholder={username} />
                <FormInput editable={editable} placeholder={email} />
                {editable && !this.state.change ? (
                  <FormButton title="Change Password" handler={this.checkChange} />
                ) : null}
                {this.state.change ? (
                  <FormInput placeholder="New Password" />
                  ) : null}
                {this.state.change ? (
                  <FormInput placeholder="Verify Password" />
                  ) : null}
                {this.state.change ? (
                  <FormButton title="Save" handler={this.checkChange} />
                ) : null}
              </View>
            </View>
            <View style={[Grid.row, { flex: 0.3, marginTop: 35 }]}>
              {editable ? (
                <View style={[Grid.grid, Grid.alignMiddle]}>
                  <View style={[Grid.row, Grid.p0, Grid.alignItemsCenter]}>
                    <View style={[Grid.col10]}>
                      <Button
                        color="#FF1100"
                        style={styles.textDelete}
                        title="Delete User"
                        onPress={() => console.log('pressed')}
                      />
                    </View>
                  </View>
                      
                  <View style={[Grid.row, Grid.p0, Grid.alignItemsCenter]}>
                    <View style={[Grid.col10]}>
                      <Button
                        color="#FFA00D"
                        style={styles.textDelete}
                        title="Log Out"
                        onPress={() => console.log('pressed')}
                      />
                    </View>
                  </View>
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export default ConfigViewUser;
