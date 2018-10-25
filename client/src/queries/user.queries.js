import gql from 'graphql-tag';

// get the user and all user's groups
const NEW_USER = gql`
  mutation addNewUser($email: String!, $username: String!, $password: String!) {
    addNewUser(email: $email, username: $username, password: $password) {
      username
      email
    }
  }
`;

const GET_USER = gql`
  query user($email: String!) {
    user(email: $email) {
      id
      username
      email
    }
  }
`;

const GET_USERS = gql`
  {
    users {
      username
    }
  }
`;
export { NEW_USER, GET_USER, GET_USERS };
