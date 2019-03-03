import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import ShirtEditor from '../components/ShirtEditor';
import SAVE_TEXTURE from '../../../queries/save-texture.mutation';
import CREATE_SHIRT from '../../../queries/create-shirt.mutation';
import CLEAN_SHIRT_TEXTURES from '../../../queries/clean-shirt-textures.mutation';
import CHANGE_SHIRT_NAME from '../../../queries/update-shirt-name.mutation';
import TSHIRTS from '../../../queries/tshirt.queries';
import UPDATE_SHIRT_COLOR from '../../../queries/update-shirt-color.mutation';
import withLoading from '../../../components/withLoading';

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

const refetchingAfterUpdate = graphql(UPDATE_SHIRT_COLOR, {
  props: ({ mutate }) => ({
    refetchingQuerys: (tshirtId, color) => mutate({
      variables: { tshirtId, color },
      refetchQueries: ['tshirt', 'userById'],
    }),
  }),
});

const updateShirtColorMutation = graphql(UPDATE_SHIRT_COLOR, {
  props: ({ mutate }) => ({
    updateShirtColor: (tshirtId, color) => mutate({
      variables: { tshirtId, color },
    }),
  }),
});

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default compose(
  connect(mapStateToProps),
  saveTextureMutation,
  createShirtMutation,
  cleanShirtTexturesMutation,
  updateShirtNameMutation,
  updateShirtColorMutation,
  refetchingAfterUpdate,
  withLoading,
)(ShirtEditor);
