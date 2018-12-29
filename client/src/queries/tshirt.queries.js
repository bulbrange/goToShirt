import gql from 'graphql-tag';

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

export { TSHIRTS };
