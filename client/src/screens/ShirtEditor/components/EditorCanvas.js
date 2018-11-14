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
});

const front = require('../images/bases/front.png');
const back = require('../images/bases/back.png');
const shadowfront = require('../images/bases/shadowfront.png');
const shadowback = require('../images/bases/shadowback.png');

const optionPanelOffsetBottom = -550;
const optionPanelMarginBottom = 20;
const animationDelay = 500;
const isTextureSelected = textures => textures.some(texture => texture.focus);

class EditorCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOptionPanel: false,
      yValue: new Animated.Value(optionPanelOffsetBottom),
      yValue2: new Animated.Value(optionPanelMarginBottom),
    };
  }

  moveAnimation = (yValue, condition) => {
    const { isOptionPanel } = this.state;
    const newTo = condition ? optionPanelOffsetBottom : optionPanelMarginBottom;
    Animated.timing(yValue, {
      toValue: newTo,
      duration: animationDelay,
      asing: Easing.ease,
    }).start();
    this.setState({
      isOptionPanel: !isOptionPanel,
    });
  };

  handleRemoveTexture = async (id) => {
    const { states } = this.props;
    await this._reactInternalFiber._debugOwner.stateNode.setState({
      frontTextures: states.frontTextures.filter(texture => texture.id !== id),
      backTextures: states.backTextures.filter(texture => texture.id !== id),
    });
  };

  handleTextureFocusLost = async () => {
    const { states } = this.props;
    await [...states.frontTextures, ...states.backTextures].map(texture => (texture.focus = false));
    this._reactInternalFiber._debugOwner.stateNode.setState({
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
      this._reactInternalFiber._debugOwner.stateNode.setState({
        backTextures: textures,
      });
      return;
    }
    this._reactInternalFiber._debugOwner.stateNode.setState({
      frontTextures: textures,
    });
  };

  handleIncreaseTexture = () => {
    const { states } = this.props;
    const textures = states.switched ? states.backTextures : states.frontTextures;
    textures.map((texture) => {
      if (texture.focus && texture.renderSize < 200) {
        /*if (texture.renderSize === 80) texture.renderSize = 110;
        else if (texture.renderSize === 110) texture.renderSize = 200;*/
        texture.renderSize += 20;
      }
      return texture;
    });
    if (states.switched) {
      this._reactInternalFiber._debugOwner.stateNode.setState({
        backTextures: textures,
      });
      return;
    }
    this._reactInternalFiber._debugOwner.stateNode.setState({
      frontTextures: textures,
    });
  }

  handleDecreaseTexture = () => {
    const { states } = this.props;
    const textures = states.switched ? states.backTextures : states.frontTextures;
    textures.map((texture) => {
      if (texture.focus && texture.renderSize > 80) {
        /*if (texture.renderSize === 200) texture.renderSize = 110;
        else if (texture.renderSize === 110) texture.renderSize = 80;*/
        texture.renderSize -= 20;
      }
      return texture;
    });
    if (states.switched) {
      this._reactInternalFiber._debugOwner.stateNode.setState({
        backTextures: textures,
      });
      return;
    }
    this._reactInternalFiber._debugOwner.stateNode.setState({
      frontTextures: textures,
    });
  }

  render() {
    const {
      states, handlers,
    } = this.props;

    const { yValue, yValue2, isOptionPanel } = this.state;

    const buttonName = !isOptionPanel ? 'cog' : 'cogs';
    const textures = !states.switched ? states.frontTextures : states.backTextures;
    // plus minus tint
    return (
      <View style={[Grid.col12, Colors.white, {}]}>
        {states.switched
          ? backgroundImg(back, shadowback, states.baseColor, this.handleTextureFocusLost)
          : backgroundImg(front, shadowfront, states.baseColor, this.handleTextureFocusLost)}
        <View style={styles.cogButton}>
          <IconButton name={buttonName} size={40} handler={() => this.moveAnimation(yValue)} />
        </View>
        <OptionPanel
          animationValues={{ y: yValue }}
          names={['exchange-alt', 'palette', 'film', 'align-center', 'undo', 'tshirt', 'save']}
          handlers={[
            handlers.handleSwitch(this.handleTextureFocusLost),
            handlers.handleColorPicker,
            handlers.handleImageSlider,
            handlers.handlerMock,
            handlers.handlerMock,
            handlers.handlerMock,
            handlers.handlerSave,
          ]}
          position={{ right: 5, bottom: 0 }}
        />
        {isTextureSelected([...states.frontTextures, ...states.backTextures]) ?
          (
            <OptionPanel
              animationValues={{ y: yValue2 }}
              names={['plus', 'minus', 'tint']}
              handlers={[
                this.handleIncreaseTexture,
                this.handleDecreaseTexture,
                () => console.log("tint working"),
              ]}
              position={{ left: 5, bottom: 0 }}
              buttonStyle={{ padding: 5 }}
            />
          )
          : null}
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
            handleRemoveTexture={this.handleRemoveTexture}
          />
        ))}
      </View>
    );
  }
}

export default EditorCanvas;
