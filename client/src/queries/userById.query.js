import gql from 'graphql-tag';

const USER_BY_ID = gql`
  query userById($id: Int!) {
    userById(id: $id) {
      id
      avatar
      username
      email
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
          source
          sourceBack
        }
      }
    }
  }
`;

const EDIT_USER = gql`
  mutation configEditUser($email: String!, $username: String!, $password: String!){
    configEditUser(email: $email, username: $username, password: $password){
      email,
      username,
      password
    }
  }
`;

export default { USER_BY_ID, EDIT_USER };
