import React, { Component } from 'react';
import { Text, Animated } from 'react-native';
import { connect } from 'react-redux';
import { AUTH_RESET_DELAY, HEADER_START_DELAY } from '../constants/animation.constants';

class MainHeader extends Component {
  constructor(props) {
    super(props);
    const { initialFlex = 0.4 } = this.props;
    this.state = {
      flex: new Animated.Value(initialFlex),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { flex } = this.state;
    const { initialFlex = 0.4 } = this.props;

    if (!nextProps.isLoading && !nextProps.auth.id) flex.setValue(initialFlex);
    else if (nextProps.auth.id) {
      setTimeout(() => {
        flex.setValue(initialFlex);
      }, AUTH_RESET_DELAY);
    }
  }

  startAnimation = () => {
    const { flex } = this.state;
    setTimeout(() => {
      Animated.timing(flex, {
        toValue: 0.1,
        duration: 300,
      }).start();
    }, HEADER_START_DELAY);
  };

  render() {
    const { isLoading, fontSize } = this.props;
    const { flex } = this.state;
    if (isLoading) this.startAnimation();
    return (
      <Animated.View style={{ flex, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontFamily: 'GREALN', fontSize, color: 'rgba(0,0,0,0.7)' }}>
          Go To Shirt
        </Text>
      </Animated.View>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps)(MainHeader);

/*
<Image
      style={[
        {
          flex: 1,
          width: null,
          height: null,
        },
      ]}
      resizeMode="cover"
      source={{
        uri: 'https://facebook.github.io/react/logo-og.png',
      }}
    />


*/
