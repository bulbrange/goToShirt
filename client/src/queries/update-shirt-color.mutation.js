import gql from 'graphql-tag';

const UPDATE_SHIRT_COLOR = gql`
  mutation updateShirtColor($tshirtId: Int!, $color: String!) {
    updateShirtColor(tshirtId: $tshirtId, color: $color) {
      id
      userId
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

export default UPDATE_SHIRT_COLOR;
