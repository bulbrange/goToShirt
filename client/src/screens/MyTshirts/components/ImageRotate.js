import React, { Component } from 'react';
import { Animated } from 'react-native';

class ImageRotate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rotation: new Animated.Value(1),
    };
  }

  componentDidMount() {
    this.runAnimation();
  }

  async runAnimation() {
    await this.setState({
      rotation: new Animated.Value(1),
    });
    const { rotation } = this.state;
    Animated.timing(rotation, {
      toValue: 0,
      duration: 4000,
    }).start(() => setTimeout(() => {
      this.runAnimation();
    }, 3000));
  }

  render() {
    const { source } = this.props;
    const { rotation } = this.state;
    const spin = rotation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <Animated.Image
        resizeMode="contain"
        style={{
          flex: 1,
          width: null,
          height: null,
          transform: [{ rotateY: spin }],
        }}
        source={source}
      />
    );
  }
}
export default ImageRotate;
