import gql from 'graphql-tag';

const MESSAGE_ADDED_SUBSCRIPTION = gql`
  subscription messageAdded($groupIds: [Int]) {
    messageAdded(groupIds: $groupIds) {
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
`;
export default MESSAGE_ADDED_SUBSCRIPTION;
