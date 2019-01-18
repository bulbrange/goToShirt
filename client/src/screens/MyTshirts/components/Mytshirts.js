import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Sound from 'react-native-sound';
import Grid from '../../../styles/grid';
import FormSelect from '../../../components/FormSelect';
import IconButton from '../../../components/IconButton';
import MyTshirtsOptions from './MyTshirtsOptions';
import { Colors, RawColors } from '../../../styles/colors';
// import mockedTshirts from '../mockedTshirts';
import Carrousel from '../../../components/Carrousel';
import IP from '../../../ip';

// This data will be from DB user->groups

const styles = StyleSheet.create({
  changeSide: {
    position: 'absolute',
    right: 15,
    top: 0,
    zIndex: 51,
    padding: 15,
  },
});

class Mytshirts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: null,
      currentImageSelected: null,
      name: 'Select a T-shirt',
      selected: null,
      isFront: true,
      options: false,
      items: [{ label: 'FILTER BY OWN', value: 'own' }],
      selectedTshirts: null,
    };
    this.sound = new Sound('button.mp3', Sound.MAIN_BUNDLE, (error) => {});
  }

  componentDidMount() {
    const { userById, tshirts } = this.props;
    const { items } = this.state;
    if (!userById.groups) {
      return <ActivityIndicator size="large" color="red" />;
    }
    const finalItems = userById.groups.map(group => ({
      label: `FILTER BY ${group.name.toUpperCase()} GROUP`,
      value: group.name,
    }));

    this.setState({
      items: [...items, ...finalItems],
      selectedTshirts: tshirts,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { selected } = this.state;
    if (selected && nextProps.tshirts) {
      const updatedTshirt = nextProps.tshirts.filter(tshirt => tshirt.id === selected.id)[0];
      if (updatedTshirt && selected.name !== updatedTshirt.name) {
        this.setState({
          name: updatedTshirt.name,
          selected: updatedTshirt,
        });
      }
    }
  }

  renderItem = ({ item }) => {
    const { text } = item;
    return (
      <TouchableOpacity style={Grid.col8} onPress={this.handlerChats}>
        <Text>{text}</Text>
      </TouchableOpacity>
    );
  };

  selectHandler = async (itemValue, itemIndex) => {
    const { userById } = this.props;
    const selectedGroup = userById.groups.filter(group => group.name === itemValue)[0];
    const selectedTshirts = await selectedGroup.tshirts; /* .map((tshirt) => {
      tshirt.source = `http://${IP}:3333/front_${tshirt.id}.png`;
      tshirt.sourceBack = `http://${IP}:3333/back_${tshirt.id}.png`;
    }); */
    console.log('YEEEEPA', selectedTshirts);
    this.setState({
      filter: itemValue,
      selectedTshirts,
    });
  };

  onChangeSide = () => {
    const { selected, isFront } = this.state;
    if (selected === null) return;

    this.setState({
      currentImageSelected: isFront ? selected.sourceBack : selected.source,
      isFront: !isFront,
    });
  };

  onImagePress = () => {
    const { selected } = this.state;
    if (selected === null) return;
    this.setState({
      options: true,
    });
  };

  onImageSelected = (source, id) => {
    const { tshirts } = this.props;
    const selected = tshirts.filter(x => x.id === id)[0];

    this.setState({
      currentImageSelected: source,
      selected,
      isFront: true,
      name: selected.name,
    });
    this.sound.stop();
    setTimeout(() => {
      Sound.setCategory('Playback', true);
      this.sound.play();
    }, 1);
  };

  onCancelPress = () => {
    this.setState({
      options: false,
    });
  };

  onRemoveShirt = async (shirt) => {
    const { removeShirt } = this.props;
    const endpoint = `http://${IP}:8080/delete/${shirt.id}`;
    await removeShirt(shirt.id).then(async () => {
      Alert.alert('Work done!!', `Say bye bye to your '${shirt.name}' tshirt`);
      await this.setState({
        currentImageSelected: null,
        name: 'Select a T-shirt',
        selected: null,
        isFront: true,
        options: false,
      });
      console.log('THAT HAPPENED');
    });
    await fetch(endpoint).catch(err => console.log(err));
  };

  render() {
    const {
      tshirts,
      navigation: { navigate },
    } = this.props;
    if (!tshirts) return <ActivityIndicator size="large" color="#0000ff" />;
    const {
      filter,
      currentImageSelected,
      name,
      options,
      selected,
      items,
      selectedTshirts,
    } = this.state;
    tshirts.map((tshirt) => {
      tshirt.source = `http://${IP}:3333/front_${tshirt.id}.png`;
      tshirt.sourceBack = `http://${IP}:3333/back_${tshirt.id}.png`;
    });
    console.log('props @Mytshirts', this.props);

    if (!selectedTshirts) return <ActivityIndicator />;
    return (
      <View style={[Grid.grid, Colors.white]}>
        {options ? (
          <MyTshirtsOptions
            cancelHandler={this.onCancelPress}
            shirt={selected}
            navigate={navigate}
            onRemoveShirt={this.onRemoveShirt}
          />
        ) : null}
        <View style={[Grid.row, { flex: 0.1 }]}>
          <View style={[Grid.col12]}>
            <FormSelect selectedValue={filter} handler={this.selectHandler} items={items} />
          </View>
        </View>
        <View
          style={[
            Grid.row,
            Grid.justifyCenter,
            {
              flex: 0.05,
              marginTop: 10,
              borderTopWidth: 3,
              borderColor: RawColors.light,
            },
          ]}
        >
          <Text style={{ fontWeight: 'bold', color: RawColors.dark, fontSize: 20 }}>{name}</Text>
        </View>
        <View style={[Grid.row, { flex: 0.55 }]}>
          <IconButton
            name="exchange-alt"
            size={35}
            handler={this.onChangeSide}
            styles={styles.changeSide}
          />
          <TouchableOpacity onPress={this.onImagePress} style={[Grid.col12, { paddingTop: 10 }]}>
            <Image
              resizeMode="contain"
              style={{
                flex: 1,
                width: null,
                height: null,
              }}
              source={{ uri: currentImageSelected }}
            />
          </TouchableOpacity>
        </View>
        <View style={[Grid.row, Grid.p0, Grid.alignMiddle, { flex: 0.3 }]}>
          <Carrousel images={selectedTshirts} handler={this.onImageSelected} animated args={[]} />
        </View>
      </View>
    );
  }
}
export default Mytshirts;
