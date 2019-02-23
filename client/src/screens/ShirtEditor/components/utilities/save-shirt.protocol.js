import { Alert } from 'react-native';
import prompt from 'react-native-prompt-android';

export const safeName = name => name
  .trim()
  .split(' ')
  .filter(word => word.length)
  .join(' ');

const saveShirt = async (addNewShirt, params, handleActualShirt, handleSave) => {
  await addNewShirt(params[0], params[1].trim(), params[2])
    .then(async (newShirt) => {
      await handleActualShirt(newShirt.data.addNewShirt);
      Alert.alert('All good!!', `New shirt created: ${newShirt.data.addNewShirt.name}`);
      await handleSave();
    })
    .catch((e) => {
      Alert.alert('Something went wrong...', 'Sorry, your shirt wasn´t saved');
      console.log(e);
    });
};

const namePrompter = (addNewShirt, params, nameHandler, handleActualShirt, handleSave) => {
  if (!params[1].trim().length) {
    prompt(
      'How ur shirt is called?',
      'Type your new shirt name:',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        {
          text: 'OK',
          onPress: async (shirtName) => {
            if (shirtName.trim().length) {
              await nameHandler(shirtName);
              saveShirt(
                addNewShirt,
                [params[0], shirtName.trim(), params[2]],
                handleActualShirt,
                handleSave,
              );
            } else {
              Alert.alert('Don´t try to cheat me...', 'Shirt name should contain something!!');
            }
          },
        },
      ],
      {
        type: 'email-address',
        cancelable: false,
        defaultValue: 'My new Tshirt',
        placeholder: 'How am I called?',
      },
    );
  } else {
    saveShirt(addNewShirt, params, handleActualShirt, handleSave);
  }
};

export default namePrompter;
