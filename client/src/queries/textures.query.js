import gql from 'graphql-tag';

const TEXTURES = gql`
  query textures($tshirtId: Int!) {
    textures(tshirtId: $tshirtId) {
      id
      source
      posX
      posY
      renderSize
      backgroundColor
      tintColor
      face
      tshirtId
      rotate
      text
    }
  }
`;

export default TEXTURES;
