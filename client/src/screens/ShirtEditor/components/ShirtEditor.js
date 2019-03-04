import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { Grid } from '../../../styles/grid';
import EditorCanvas from './EditorCanvas/EditorCanvas';
import OutputPanel from './OutputPanel/OutputPanel';
import namePrompter, { safeName } from './utilities/save-shirt.protocol';
import saveTexture from './utilities/save-textures.protocol';
import loadingProtocol, { isTextureSelected } from './utilities/load-shirt.protocol';
import IP from '../../../ip';
import Indicator from '../../../components/Indicator';

class ShirtEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switched: false,
      shirtName: '',
      baseColor: '#3030ff',
      saving: true,
      actualShirt: undefined,
      frontTextures: [],
      backTextures: [],
    };
  }

  componentDidMount() {
    const { tshirt, addNewShirt } = this.props;
    if (tshirt) {
      this.setState(loadingProtocol(tshirt));
    }
    if (addNewShirt) {
      this.setState({
        saving: false,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tshirt) {
      this.setState(loadingProtocol(nextProps.tshirt));
    }
  }

  handleTextures = async (
    source,
    _,
    posX,
    posY,
    renderSize,
    backgroundColor,
    text = '',
    tintColor,
  ) => {
    const { frontTextures, backTextures, switched } = this.state;
    const id = Date.now();
    const newTexture = {
      source,
      posX,
      posY,
      renderSize,
      id,
      backgroundColor,
      focus: false,
      rotate: '0deg',
      text,
      tintColor,
    };
    if (!switched) {
      await this.setState({
        frontTextures: [...frontTextures, newTexture],
      });
    } else {
      await this.setState({
        backTextures: [...backTextures, newTexture],
      });
    }
  };

  handleSwitch = async () => {
    const { switched } = this.state;
    await this.setState({
      switched: !switched,
    });
    this.handleTextureFocusLost();
  };

  handleBaseColor = (baseColor, bgColor = true) => {
    const { frontTextures, backTextures } = this.state;
    if (isTextureSelected([...frontTextures, ...backTextures])) {
      [...frontTextures, ...backTextures].map((texture) => {
        if (bgColor && texture.focus) {
          texture.backgroundColor = baseColor;
        } else if (!bgColor && texture.focus) {
          texture.tintColor = baseColor;
        } else {
          texture;
        }
        return texture;
      });
      this.setState({
        frontTextures,
        backTextures,
      });
    } else {
      this.setState({
        baseColor,
      });
    }
  };

  handleText = (text, source) => {
    const { frontTextures, backTextures } = this.state;
    if (isTextureSelected([...frontTextures, ...backTextures])) {
      [...frontTextures, ...backTextures].map((texture) => {
        if (texture.focus) {
          texture.text = text;
          texture.source = source;
        }
        return texture;
      });
      this.setState({
        frontTextures,
        backTextures,
      });
    }
  };

  handleShirtName = (text) => {
    this.setState({
      shirtName: text,
    });
  };

  handleActualShirt = (actualShirt) => {
    this.setState({
      actualShirt,
    });
  };

  handleRotation = (val) => {
    const { frontTextures, backTextures } = this.state;
    [...frontTextures, ...backTextures].map((texture) => {
      if (texture.focus) texture.rotate = `${val}deg`;
      return texture;
    });
    this.setState({
      frontTextures,
      backTextures,
    });
  };

  handleCreateNewShirt = () => {
    const { shirtName, baseColor } = this.state;
    const { addNewShirt, auth } = this.props;
    const name = safeName(shirtName);

    namePrompter(
      addNewShirt,
      [auth.id, name, baseColor],
      this.handleShirtName,
      this.handleActualShirt,
      this.handleSave,
    );
  };

  handleSave = async () => {
    const {
      frontTextures, backTextures, actualShirt, shirtName, baseColor,
    } = this.state;
    const {
      addTexture,
      cleanShirtTextures,
      updateShirtName,
      updateShirtColor,
      refetchingQuerys,
    } = this.props;
    if (!actualShirt) await this.handleCreateNewShirt();
    else {
      this.setState({
        saving: true,
      });
      try {
        await cleanShirtTextures(actualShirt.id);
        //[...frontTextures, ...backTextures].map(t => (t.source.includes('/') ? (t.source = t.source.split('/')[4]) : t.source));
        if (shirtName.trim().length) {
          const name = safeName(shirtName);
          await updateShirtName(actualShirt.id, name);
          actualShirt.name = name;
          this.setState({ shirtName: name, actualShirt });
        } else {
          await this.setState({ shirtName: actualShirt.name });
          Alert.alert(
            'Watch out!! You can´t leave a shirt without name.',
            `Using last name saved('${actualShirt.name}') for now :P`,
          );
        }
        await saveTexture(addTexture, this.state.actualShirt, frontTextures, 'front');
        await saveTexture(addTexture, this.state.actualShirt, backTextures, 'back');
        await updateShirtColor(actualShirt.id, baseColor);
        await [...frontTextures, ...backTextures].map(t => (t.text.length ? t.source : (t.source = `${t.source}`)));
        await this.setState({
          saving: false,
          frontTextures,
          backTextures,
        });
        await Alert.alert(`T-Shirt: ${actualShirt.name}`, 'All good. State saved!');
        setTimeout(async () => {
          await fetch(`http://${IP}:8080/shirt/${actualShirt.id}`).then(data => console.log(data));

        }, 7000);
        setTimeout(async () => refetchingQuerys(actualShirt.id, baseColor), 6000);
      } catch (err) {
        Alert.alert('Something went wrong...', 'Your t-shirt state was not saved.');
      }
    }
  };

  handleTextureFocusLost = async () => {
    const { frontTextures, backTextures } = this.state;
    await [...frontTextures, ...backTextures].map(texture => (texture.focus = false));
    this.setState({
      frontTextures,
      backTextures,
    });
  };

  handleBabylon = () => {
    const {
      navigation: { navigate },
    } = this.props;
    const { actualShirt, shirtName } = this.state;
    if (actualShirt) navigate('WebViewer', { shirtID: actualShirt.id, shirtName });
    else Alert.alert('Watch out!!', 'Your t-shirt must be saved first...');
  };

  render() {
    const {
      switched, baseColor, frontTextures, backTextures, shirtName, saving,
    } = this.state;
    if (saving) return <Indicator />;
    return (
      <View style={[Grid.grid, Grid.p0]}>
        <View style={[Grid.row, Grid.p0, { flex: 0.7 }]}>
          <EditorCanvas
            states={{
              switched,
              baseColor,
              frontTextures,
              backTextures,
              ShirtEditor: this,
            }}
            handlers={{
              handleTextureFocusLost: this.handleTextureFocusLost,
              handleSwitch: this.handleSwitch,
            }}
          />
        </View>
        <View style={[Grid.row, Grid.p0, { flex: 0.3, zIndex: 1 }]}>
          <OutputPanel
            states={{
              switched,
              baseColor,
              frontTextures,
              backTextures,
              shirtName,
              ShirtEditor: this,
            }}
            handlers={{
              handleTextures: this.handleTextures,
              handleRotation: this.handleRotation,
              handleBaseColor: this.handleBaseColor,
              handleSwitch: this.handleSwitch,
              handleCarrousel: this.handleCarrousel,
              handleSlider: this.handleSlider,
              handleText: this.handleText,
              handleSave: this.handleSave,
              handleShirtName: this.handleShirtName,
              handleBabylon: this.handleBabylon,
            }}
          />
        </View>
      </View>
    );
  }
}

export default ShirtEditor;
