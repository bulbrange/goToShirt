import gql from 'graphql-tag';

const CHANGE_SHIRT_NAME = gql`
  mutation updateShirtName($tshirtId: Int!, $name: String!) {
    updateShirtName(tshirtId: $tshirtId, name: $name) {
      id
      name
      color
    }
  }
`;

export default CHANGE_SHIRT_NAME;
