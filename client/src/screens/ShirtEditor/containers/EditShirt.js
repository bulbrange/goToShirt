import { graphql, compose } from 'react-apollo';
import ShirtEditor from '../components/ShirtEditor';
import SAVE_TEXTURE from '../../../queries/save-texture.mutation';
import CLEAN_SHIRT_TEXTURES from '../../../queries/clean-shirt-textures.mutation';
import CHANGE_SHIRT_NAME from '../../../queries/update-shirt-name.mutation';
import { TSHIRT, TSHIRTS } from '../../../queries/tshirt.queries';
import withLoading from '../../../components/withLoading';
import UPDATE_SHIRT_COLOR from '../../../queries/update-shirt-color.mutation';

const saveTextureMutation = graphql(SAVE_TEXTURE, {
  props: ({ mutate }) => ({
    addTexture: texture => mutate({
      variables: { texture },
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

const shirtQuery = graphql(TSHIRT, {
  options: ownProps => ({ variables: { id: ownProps.navigation.state.params.shirtID } }),
  props: ({ data: { tshirt } }) => ({ tshirt }),
});

const updateShirtColorMutation = graphql(UPDATE_SHIRT_COLOR, {
  props: ({ mutate }) => ({
    updateShirtColor: (tshirtId, color) => mutate({
      variables: { tshirtId, color },
      refetchQueries: ['tshirt', 'tshirts'],
    }),
  }),
});

const EditShirt = compose(
  saveTextureMutation,
  cleanShirtTexturesMutation,
  updateShirtNameMutation,
  updateShirtColorMutation,
  shirtQuery,
  withLoading,
)(ShirtEditor);

export default EditShirt;
