import gql from 'graphql-tag';

const CREATE_SHIRT = gql`
  mutation addNewShirt($userId: Int!, $name: String!, $color: String!) {
    addNewShirt(userId: $userId, name: $name, color: $color) {
      id
      userId
      name
      color
    }
  }
`;

export default CREATE_SHIRT;
