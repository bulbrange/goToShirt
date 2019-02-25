import React, { Component } from 'react';
import { TouchableOpacity, Text, Animated } from 'react-native';
import { connect } from 'react-redux';
import { AUTH_RESET_DELAY } from '../constants/animation.constants';

class TabText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeOut: new Animated.Value(1),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { fadeOut } = this.state;
    if (!nextProps.isLoading && !nextProps.init) fadeOut.setValue(1);
    else if (nextProps.init) {
      setTimeout(() => {
        fadeOut.setValue(1);
      }, AUTH_RESET_DELAY);
    }
  }

  startAnimation = () => {
    const { fadeOut } = this.state;
    Animated.timing(fadeOut, {
      toValue: 0,
      duration: 300,
    }).start();
  };

  render() {
    const {
      title, handler, isLoading, style = {},
    } = this.props;
    const { fadeOut } = this.state;
    if (isLoading) this.startAnimation();

    return (
      <Animated.View style={{ marginTop: 20, opacity: fadeOut }}>
        <TouchableOpacity onPress={() => handler()} style={[{ flex: 1 }, style]}>
          <Text style={{ textAlign: 'center' }}>{title}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

export default TabText;
