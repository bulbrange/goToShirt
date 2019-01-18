import gql from 'graphql-tag';

const USER_BY_ID = gql`
  query userById($id: Int!) {
    userById(id: $id) {
      id
      username
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
        tshirts {
          id
          name
        }
      }
    }
  }
`;
export default USER_BY_ID;
