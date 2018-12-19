import React, { Component } from 'react';
import {
  View, Picker, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import fs from 'react-native-fs';
import Grid from '../../../../../styles/grid';
import Colors, { RawColors } from '../../../../../styles/colors';
// import kk from '../../../../../assets/fonts'

const posX = 85;
const posY = 100;
const renderSize = 30;

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  picker: {
    height: 30,
    backgroundColor: RawColors.light,
  },
});

class FontPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFont: undefined,
      fonts: undefined,
    };
  }

  async componentDidMount() {
    const readedFonts = await fs.readDirAssets('fonts');
    this.setState({
      fonts: readedFonts,
      activeFont: readedFonts[0].name.split('.')[0],
    });
  }
  // handleTextures = async (source, _, posX, posY, renderSize, backgroundColor, text = '') => {

  render() {
    const { fonts, activeFont } = this.state;
    const { handler } = this.props;
    console.log(activeFont);
    return (
      <View style={[Grid.grid]}>
        <View style={[Grid.row, { flex: 0.3 }]}>
          <View style={[Grid.col12]}>
            <Picker
              selectedValue={activeFont}
              style={[styles.picker]}
              onValueChange={(itemValue, itemIndex) => this.setState({ activeFont: itemValue })}
            >
              {fonts
                ? fonts.map(font => (
                  <Picker.Item
                    key={font.name}
                    label={font.name.split('.')[0]}
                    value={font.name.split('.')[0]}
                  />
                ))
                : undefined}
            </Picker>
          </View>
        </View>
        <View style={[Grid.row, { flex: 0.7 }]}>
          <TouchableOpacity
            style={[Grid.col12]}
            onPress={() => handler(activeFont, _, posX, posY, renderSize, 'black', 'HELLO WOLRD')}
          >
            <Text style={[styles.text, { fontFamily: activeFont }]}>Click to add text</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default FontPicker;
