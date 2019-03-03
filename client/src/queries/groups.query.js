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
      messages {
        to {
          id
          name
        }
        from {
          id
          username
        }
        text
      }
    }
  }
`;

export default USER_GROUPS;
