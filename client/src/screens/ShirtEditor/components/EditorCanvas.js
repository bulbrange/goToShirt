import React, { Component } from 'react';
import {
  View, StyleSheet, Animated, Easing,
} from 'react-native';
import IconButton from '../../../components/IconButton';
import Grid from '../../../styles/grid';
import { Colors } from '../../../styles/colors';
import Draggable from './Draggable';
import OptionPanel from './OptionPanel';
import backgroundImg from './backgroundImg';

const styles = StyleSheet.create({
  cogButton: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 5,
    right: 10,
  },
  shadowBackground: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  focusOn: {
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 5,
  },
});

const front = require('../images/bases/front.png');
const back = require('../images/bases/back.png');
const shadowfront = require('../images/bases/shadowfront.png');
const shadowback = require('../images/bases/shadowback.png');

const optionPanelOffsetBottom = -550;
const optionPanelMarginBottom = 20;
const animationDelay = 500;

class EditorCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOptionPanel: false,
      yValue: new Animated.Value(optionPanelOffsetBottom),
    };
  }

  moveAnimation = () => {
    const { yValue, isOptionPanel } = this.state;
    const newTo = isOptionPanel ? optionPanelOffsetBottom : optionPanelMarginBottom;
    Animated.timing(yValue, {
      toValue: newTo,
      duration: animationDelay,
      asing: Easing.ease,
    }).start();
    this.setState({
      isOptionPanel: !isOptionPanel,
    });
  };

  handleTextureFocusLost = async () => {
    const { states } = this.props;
    await [...states.frontTextures, ...states.backTextures].map(texture => (texture.focus = false));
    this.setState({
      frontTextures: states.frontTextures,
      backTextures: states.backTextures,
    });
  };

  updatePosition = (_, posX, posY, id) => {
    const { states } = this.props;
    const textures = states.switched ? states.backTextures : states.frontTextures;
    textures.map((texture) => {
      if (texture.id === id) {
        texture.posX = posX;
        texture.posY = posY;
        texture.focus = true;
      } else {
        texture.focus = false;
      }
      return texture;
    });
    if (states.switched) {
      this.setState({
        backTextures: textures,
      });
      return;
    }
    this.setState({
      frontTextures: textures,
    });
  };

  render() {
    const {
      states,
      handlers,
      handleColorPicker,
      handleImageSlider
    } = this.props;

    const { yValue, isOptionPanel } = this.state;

    const buttonName = !isOptionPanel ? 'cog' : 'cogs';
    const textures = !states.switched ? states.frontTextures : states.backTextures;
    return (
      <View style={[Grid.col12, Colors.white, {}]}>
        {states.switched
          ? backgroundImg(back, shadowback, states.baseColor, this.handleTextureFocusLost)
          : backgroundImg(front, shadowfront, states.baseColor, this.handleTextureFocusLost)}
        <View style={styles.cogButton}>
          <IconButton name={buttonName} size={40} handler={this.moveAnimation} />
        </View>
        <OptionPanel
          animationValues={{ y: yValue }}
          names={['exchange-alt', 'palette', 'film', 'align-center', 'undo', 'tshirt', 'save']}
          handlers={[
            handlers.handleSwitch(this.handleTextureFocusLost),
            handleColorPicker,
            handleImageSlider,
            this.handlerMock,
            this.handlerMock,
            this.handlerMock,
            this.handlerSave,
          ]}
          position={{ posX: 5, posY: 0 }}
        />
        {textures.map(texture => (
          <Draggable
            key={Math.floor(Math.random() * 1000000)}
            id={texture.id}
            source={texture.source}
            posX={texture.posX}
            posY={texture.posY}
            focus={texture.focus}
            renderSizeX={texture.renderSize}
            renderSizeY={texture.renderSize}
            updatePosition={this.updatePosition}
            handleSwitch={handlers.handleSwitch(this.handleTextureFocusLost)}
            backgroundColor={texture.backgroundColor}
            handleRemoveTexture={handlers.handleRemoveTexture}
          />
        ))}
      </View>
    );
  }
}

export default EditorCanvas;
