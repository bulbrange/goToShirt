import React, { Component } from 'react';
import {
  TouchableOpacity, Dimensions, StyleSheet, Animated,
} from 'react-native';
import IconButton from '../../../components/IconButton';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapperOn: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    zIndex: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  },
  buttonWrapper: {
    position: 'absolute',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    top: 0,
  },
});

const editButtonFinalPos = { top: 100, left: 40 };
const viewButtonFinalPos = { top: 165, left: 10 };
const cancelButtonFinalPos = { top: 230, left: 40 };

class MyTshirtsOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editButtonTop: new Animated.Value(Math.floor(height / 2)),
      editButtonLeft: new Animated.Value(Math.floor(width / 2)),
      viewButtonTop: new Animated.Value(Math.floor(height / 2)),
      viewButtonLeft: new Animated.Value(Math.floor(width / 2)),
      cancelButtonTop: new Animated.Value(Math.floor(height / 2)),
      cancelButtonLeft: new Animated.Value(Math.floor(width / 2)),
    };
  }

  componentDidMount() {
    const {
      editButtonTop,
      editButtonLeft,
      viewButtonTop,
      viewButtonLeft,
      cancelButtonTop,
      cancelButtonLeft,
    } = this.state;

    Animated.timing(editButtonTop, {
      toValue: editButtonFinalPos.top,
      duration: 500,
    }).start();
    Animated.timing(editButtonLeft, {
      toValue: editButtonFinalPos.left,
      duration: 500,
    }).start();

    Animated.timing(viewButtonTop, {
      toValue: viewButtonFinalPos.top,
      duration: 700,
    }).start();
    Animated.timing(viewButtonLeft, {
      toValue: viewButtonFinalPos.left,
      duration: 700,
    }).start();

    Animated.timing(cancelButtonTop, {
      toValue: cancelButtonFinalPos.top,
      duration: 900,
    }).start();
    Animated.timing(cancelButtonLeft, {
      toValue: cancelButtonFinalPos.left,
      duration: 900,
    }).start();
  }

  render() {
    const { cancelHandler } = this.props;
    const {
      editButtonTop,
      editButtonLeft,
      viewButtonTop,
      viewButtonLeft,
      cancelButtonTop,
      cancelButtonLeft,
    } = this.state;
    return (
      <TouchableOpacity style={styles.wrapperOn} onPress={() => cancelHandler()}>
        <Animated.View style={[styles.buttonWrapper, { top: editButtonTop, left: editButtonLeft }]}>
          <IconButton
            name="edit"
            size={40}
            handler={() => {
              console.log('option!');
            }}
          />
        </Animated.View>
        <Animated.View style={[styles.buttonWrapper, { top: viewButtonTop, left: viewButtonLeft }]}>
          <IconButton
            name="eye"
            size={40}
            handler={() => {
              console.log('option!');
            }}
          />
        </Animated.View>
        <Animated.View
          style={[styles.buttonWrapper, { top: cancelButtonTop, left: cancelButtonLeft }]}
        >
          <IconButton name="backspace" size={40} handler={() => cancelHandler()} />
        </Animated.View>
      </TouchableOpacity>
    );
  }
}

export default MyTshirtsOptions;
