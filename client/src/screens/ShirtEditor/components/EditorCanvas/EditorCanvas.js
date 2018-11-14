import React, { Component } from 'react';
import {
  View, StyleSheet, Animated, Easing,
} from 'react-native';
import IconButton from '../../../../components/IconButton';
import Grid from '../../../../styles/grid';
import { Colors } from '../../../../styles/colors';
import OptionPanel from './components/OptionPanel';
import backgroundImg from './components/backgroundImg';
import TexturePlayground from './components/TexturePlayground';

const styles = StyleSheet.create({
  cogButton: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 5,
    right: 10,
  },
});


const front = require('./images/bases/front.png');
const back = require('./images/bases/back.png');
const shadowfront = require('./images/bases/shadowfront.png');
const shadowback = require('./images/bases/shadowback.png');

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
    [...states.frontTextures, ...states.backTextures].map((texture) => {
      if (texture.id === id) {
        texture.posX = posX;
        texture.posY = posY;
        texture.focus = true;
      } else {
        texture.focus = false;
      }
      return texture;
    });
    this._reactInternalFiber._debugOwner.stateNode.setState({
      frontTextures: states.frontTextures,
      backTextures: states.backTextures,
    });
  };

  handleIncreaseTexture = () => {
    const { states } = this.props;
    [...states.frontTextures, ...states.backTextures].map((texture) => {
      if (texture.focus && texture.renderSize < 200) texture.renderSize += 10;
      return texture;
    });
    this._reactInternalFiber._debugOwner.stateNode.setState({
      frontTextures: states.frontTextures,
      backTextures: states.backTextures,
    });
  };

  handleDecreaseTexture = () => {
    const { states } = this.props;
    [...states.frontTextures, ...states.backTextures].map((texture) => {
      if (texture.focus && texture.renderSize > 80) texture.renderSize -= 10;
      return texture;
    });
    this._reactInternalFiber._debugOwner.stateNode.setState({
      frontTextures: states.frontTextures,
      backTextures: states.backTextures,
    });
  };

  render() {
    const { states, handlers } = this.props;

    const { yValue, yValue2, isOptionPanel } = this.state;

    const buttonName = !isOptionPanel ? 'cog' : 'cogs';
    const textures = !states.switched ? states.frontTextures : states.backTextures;
    const textureSelected = isTextureSelected([...states.frontTextures, ...states.backTextures]);

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
            handlers.handleCarrousel,
            handlers.handlerMock,
            handlers.handleSlider,
            handlers.handlerMock,
            handlers.handlerSave,
          ]}
          position={{ right: 5, bottom: 0 }}
        />
        {textureSelected ? (
          <OptionPanel
            animationValues={{ y: yValue2 }}
            names={['plus', 'minus', 'tint']}
            handlers={[
              this.handleIncreaseTexture,
              this.handleDecreaseTexture,
              () => console.log('tint working'),
            ]}
            position={{ left: 5, bottom: 0 }}
            buttonStyle={{ padding: 5 }}
          />
        ) : null}
        <TexturePlayground
          textures={textures}
          handlers={{
            handleSwitch: handlers.handleSwitch(this.handleTextureFocusLost),
            handleRemoveTexture: handlers.handleRemoveTexture,
            updatePosition: this.updatePosition,
          }}
        />
      </View>
    );
  }
}

export default EditorCanvas;
