import gql from 'graphql-tag';

const CLEAN_SHIRT_TEXTURES = gql`
  mutation cleanShirtTextures($tshirtId: Int!) {
    cleanShirtTextures(tshirtId: $tshirtId) {
      id
      name
      color
    }
  }
`;

export default CLEAN_SHIRT_TEXTURES;
