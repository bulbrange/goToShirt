import gql from 'graphql-tag';

const MESSAGE_QUERY = gql`
  query message($groupId: Int!) {
    message(groupId: $groupId) {
      id
      from {
        id
        username
      }
      to {
        id
        name
      }
      text
      createdAt
    }
  }
`;
const MESSAGE_PAGINATION = gql`
  query message($groupId: Int!, $connectionInput: ConnectionInput!) {
    message(groupId: $groupId, connectionInput: $connectionInput) {
      edges {
        cursor
        node {
          id
          text
          from {
            id
            username
          }
          to {
            id
            name
          }
          createdAt
        }
      }
    }
  }
`;
export default MESSAGE_PAGINATION;
