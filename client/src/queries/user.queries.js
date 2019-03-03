import gql from 'graphql-tag';

// get the user and all user's groups
const NEW_USER = gql`
  mutation addNewUser($email: String!, $username: String!, $phone: String!, $password: String!) {
    addNewUser(email: $email, username: $username, phone: $phone, password: $password) {
      id
      username
      email
      phone
    }
  }
`;

const GET_USER_BY_EMAIL = gql`
  query userByEmail($email: String!) {
    userByEmail(email: $email) {
      id
      username
      email
      phone
    }
  }
`;
const GET_USER = gql`
  query user($email: String!, $password: String!) {
    user(email: $email, password: $password) {
      id
      username
      email
      phone
    }
  }
`;
const GET_USERS = gql`
  {
    users {
      id
      username
      email
      phone
    }
  }
`;
export {
  NEW_USER, GET_USER_BY_EMAIL, GET_USER, GET_USERS,
};
