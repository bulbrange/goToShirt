import { graphql, compose } from 'react-apollo';
import ShirtEditor from '../components/ShirtEditor';
import SAVE_TEXTURE from '../../../queries/save-texture.mutation';
import CREATE_SHIRT from '../../../queries/create-shirt.mutation';
import CLEAN_SHIRT_TEXTURES from '../../../queries/clean-shirt-textures.mutation';
import CHANGE_SHIRT_NAME from '../../../queries/update-shirt-name.mutation';
import TEXTURES from '../../../queries/textures.query';
import TSHIRTS from '../../../queries/tshirt.queries';

const saveTextureMutation = graphql(SAVE_TEXTURE, {
  props: ({ mutate }) => ({
    addTexture: texture => mutate({
      variables: { texture },
    }),
  }),
});

const createShirtMutation = graphql(CREATE_SHIRT, {
  props: ({ mutate }) => ({
    addNewShirt: (userId, name, color) => mutate({
      variables: { userId, name, color },
    }),
  }),
});

const cleanShirtTexturesMutation = graphql(CLEAN_SHIRT_TEXTURES, {
  props: ({ mutate }) => ({
    cleanShirtTextures: tshirtId => mutate({
      variables: { tshirtId },
    }),
  }),
});

const updateShirtNameMutation = graphql(CHANGE_SHIRT_NAME, {
  props: ({ mutate }) => ({
    updateShirtName: (tshirtId, name) => mutate({
      variables: { tshirtId, name },
    }),
  }),
});

/* const texturesQuery = graphql(TEXTURES, {
  options: () => ({ variables: { tshirtId: 1 } }),
  props: ({ data: { textures } }) => ({ textures }),
});
  texturesQuery,
*/

export default compose(
  saveTextureMutation,
  createShirtMutation,
  cleanShirtTexturesMutation,
  updateShirtNameMutation,
)(ShirtEditor);
