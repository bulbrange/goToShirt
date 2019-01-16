import gql from 'graphql-tag';

const USER_BY_ID = gql`
  query userById($id: Int!) {
    userById(id: $id) {
      id
      username
      groups {
        id
        name
        tshirts {
          id
          name
          source
          sourceBack
        }
      }
    }
  }
`;
export default USER_BY_ID;