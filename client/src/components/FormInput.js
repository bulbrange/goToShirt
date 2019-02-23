import React, { Component } from 'react';
import {
  TextInput, View, StyleSheet, Animated,
} from 'react-native';
import { connect } from 'react-redux';
import { Colors2, RawColors, RawColors2 } from '../styles/colors';
import { Grid } from '../styles/grid';
import { AUTH_RESET_DELAY } from '../constants/animation.constants';

// borderBottomWidth: 1,
const styles = StyleSheet.create({
  textInput: {
    marginTop: 15,
    height: 35,
    paddingLeft: 15,
    paddingTop: 8,
    fontSize: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    borderRadius: 5,
    borderColor: RawColors.primary,
  },
});

class FormInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      margin: new Animated.Value(0),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { margin } = this.state;
    if (!nextProps.isLogging && !nextProps.auth.id) margin.setValue(0.4);
    else if (nextProps.auth.id) {
      setTimeout(() => {
        margin.setValue(0.4);
      }, AUTH_RESET_DELAY);
    }
  }

  startAnimation = () => {
    const { margin } = this.state;
    Animated.timing(margin, {
      toValue: 550,
      duration: 500,
    }).start();
  };

  render() {
    const {
      placeholder, handler, value, secure, direction, isLoading, style = {}, keyboardType = "default",
    } = this.props;
    if (isLoading) this.startAnimation();
    const { margin } = this.state;
    const animatedMargin = direction === 'left' ? { marginLeft: margin } : { marginRight: margin };
    return (
      <View style={[Grid.row, Grid.p0, Grid.alignItemsCenter, style]}>
        <Animated.View style={[Grid.col10, { marginBottom: -20 }, animatedMargin]}>
          <TextInput
            style={[styles.textInput]}
            placeholder={placeholder}
            onChangeText={text => handler(text)}
            secureTextEntry={secure}
            value={value}
            keyboardType={keyboardType}
          />
        </Animated.View>
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps)(FormInput);

/*
          <Animated.View style={[Grid.col10, { marginBottom: -20, marginRight: margin }]}>
            <FormInput
              defaultValue="casas222@gmail.com"
              placeholder="Email"
              handler={handlers.userHandler}
              value={states.email}
            />
          </Animated.View>
*/
