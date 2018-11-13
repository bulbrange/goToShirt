import gql from 'graphql-tag';

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
      src
      posX
      posY
      face
      renderSize
    }
  }
`;

export { GET_TSHIRT, GET_TEXTURES };
