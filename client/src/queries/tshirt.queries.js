import gql from 'graphql-tag';
import TSHIRT_FRAGMENT from './tshirt.fragment';

const GET_TSHIRT = gql`
  query tshirt($id: Int!) {
    tshirt(id: $id) {
      id
      name
      color
    }
  }
`;

const GET_TEXTURES = gql`
  query tshirtTextures($tshirtId: Int!) {
    tshirtTextures(tshirtId: $tshirtId) {
      id
      source
      posX
      posY
      face
      renderSize
    }
  }
`;

const SAVE_TEXTURES = gql`
  mutation saveTextures($id: Int!, $posX: Int!, $posY: Int!, $renderSize: Int!) {
    saveTextures(id: $id, posX: $posX, posY: $posY, renderSize: $renderSize) {
      ...TshirtFragment
    }
  }
  ${TSHIRT_FRAGMENT}
`;

export { GET_TSHIRT, GET_TEXTURES, SAVE_TEXTURES };
