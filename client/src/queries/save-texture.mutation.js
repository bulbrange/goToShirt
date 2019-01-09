import gql from 'graphql-tag';

const SAVE_TEXTURE = gql`
  mutation addTexture($texture: CreateTextureInput!) {
    addTexture(texture: $texture) {
      id
      source
      posX
      posX
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

export default SAVE_TEXTURE;
