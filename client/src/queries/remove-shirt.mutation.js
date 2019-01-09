import gql from 'graphql-tag';

const REMOVE_SHIRT = gql`
  mutation removeShirt($tshirtId: Int!) {
    removeShirt(tshirtId: $tshirtId) {
      name
      id
    }
  }
`;

export default REMOVE_SHIRT;
