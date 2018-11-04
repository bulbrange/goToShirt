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

const GET_USER_BY_EMAIL = gql`
  query userByEmail($email: String!) {
    userByEmail(email: $email) {
      email
    }
  }
`;
const GET_USER = gql`
  query user($email: String!, $password: String!) {
    user(email: $email, password: $password) {
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
export {
  NEW_USER, GET_USER_BY_EMAIL, GET_USER, GET_USERS,
};
