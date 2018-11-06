import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  Dimensions,
  StyleSheet,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Grid from '../../../styles/grid';
import { RawColors, Colors } from '../../../styles/colors';
import IconButton from '../../../components/IconButton';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapperOn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width,
    height,
    zIndex: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  },
  wrapperOff: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 0,
    height: 0,
    zIndex: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  buttonWrapper: {
    position: 'absolute',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    left: 40,
    top: 0,
  },
  viewButton: {
    left: 10,
    top: 225,
  },
  cancelButton: {
    left: 40,
    top: 290,
  },
});

const editButtonFinalPos = { top: 160, left: 40 };
const viewButtonFinalPos = { top: 225, left: 10 };
const cancelButtonFinalPos = { top: 290, left: 40 };

class MyTshirtsOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editButtonTop: new Animated.Value(Math.floor(height / 2)),
      editButtonLeft: new Animated.Value(Math.floor(width / 2)),
    };
  }

  componentDidMount() {
    const { editButtonTop, editButtonLeft } = this.state;

    Animated.timing(editButtonTop, {
      toValue: editButtonFinalPos.top,
      duration: 500,
    }).start();
    Animated.timing(editButtonLeft, {
      toValue: editButtonFinalPos.left,
      duration: 500,
    }).start();
  }

  render() {
    const { cancelHandler } = this.props;
    const { editButtonTop, editButtonLeft } = this.state;
    return (
      <TouchableOpacity style={styles.wrapperOn} onPress={() => cancelHandler()}>
        <Animated.View
          style={[
            styles.editButton,
            styles.buttonWrapper,
            { top: editButtonTop, left: editButtonLeft },
          ]}
        >
          <IconButton
            name="edit"
            size={40}
            handler={() => {
              console.log('option!');
            }}
          />
        </Animated.View>
        <View style={[styles.viewButton, styles.buttonWrapper]}>
          <IconButton
            name="eye"
            size={40}
            handler={() => {
              console.log('option!');
            }}
          />
        </View>
        <View style={[styles.cancelButton, styles.buttonWrapper]}>
          <IconButton name="backspace" size={40} handler={() => cancelHandler()} />
        </View>
      </TouchableOpacity>
    );
  }
}

export default MyTshirtsOptions;
