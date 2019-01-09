import gql from 'graphql-tag';

const TSHIRT = gql`
  query tshirt($id: Int!) {
    tshirt(id: $id) {
      id
      name
      color
      texture {
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
  }
`;

const TSHIRTS = gql`
  query tshirts($userId: Int!) {
    tshirts(userId: $userId) {
      id
      userId
      name
      updatedAt
    }
  }
`;

export { TSHIRTS, TSHIRT };
