import gql from 'graphql-tag';

const DELETE_SHIRT = gql`
  mutation removeShirt($tshirtId: Int!) {
    removeShirt(tshirtId: $tshirtId) {
      name
      id
    }
  }
`;

export default DELETE_SHIRT;
