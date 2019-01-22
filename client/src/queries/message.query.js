import gql from 'graphql-tag';

const MESSAGE_QUERY_PAGINATION = gql`
  query message($groupId: Int!, $connectionInput: ConnectionInput) {
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
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;
export default MESSAGE_QUERY_PAGINATION;
