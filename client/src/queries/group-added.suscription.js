import gql from 'graphql-tag';

const GROUP_ADDED_SUBSCRIPTION = gql`
  subscription onGroupAdded($userId: Int) {
    groupAdded(userId: $userId) {
      id
      name
      messages(first: 1) {
        edges {
          cursor
          node {
            id
            from {
              id
              username
            }
            to {
              id
              name
            }
            createdAt
            text
          }
        }
      }
    }
  }
`;
export default GROUP_ADDED_SUBSCRIPTION;
