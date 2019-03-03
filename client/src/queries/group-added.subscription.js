import gql from 'graphql-tag';

const GROUP_ADDED_SUBSCRIPTION = gql`
  subscription groupAdded($userId: Int) {
    groupAdded(userId: $userId) {
      id
      name
      users {
        id
        username
      }
    }
  }
`;

export default GROUP_ADDED_SUBSCRIPTION;
