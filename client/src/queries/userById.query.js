import gql from 'graphql-tag';

const USER_BY_ID = gql`
  query userById($first: Int, $after: String) {
    userById {
      id
      username
      avatar
      email
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
            id
            username
          }
          to {
            id
            name
          }
          text
          createdAt
          id
        }
        users {
          id
          username
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
