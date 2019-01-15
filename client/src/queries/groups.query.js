import gql from 'graphql-tag';

const USER_GROUPS = gql`
  query groups($userId: Int!) {
    groups(userId: $userId) {
      id
      name
      users {
        id
        username
      }
    }
  }
`;

export default USER_GROUPS;
