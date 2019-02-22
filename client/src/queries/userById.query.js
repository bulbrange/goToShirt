import gql from 'graphql-tag';

const USER_BY_ID = gql`
  query userById($id: Int!, $first: Int, $after: String) {
    userById(id: $id) {
      id
      username
      tshirts {
        id
        name
        source
        sourceBack
        updatedAt
        userId
      }
      groups {
        id
        name
        messages {
          from {
            username
          }
          text
          createdAt
        }
        tshirts(first: $first, after: $after) {
          edges {
            cursor
            node {
              id
              name
              source
              sourceBack
              updatedAt
              userId
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
        }
      }
    }
  }
`;
export default USER_BY_ID;
