import gql from 'graphql-tag';
import Register from '../screens/Registrer';

// get the user and all user's groups
const USER_QUERY = gql`
  mutation Register($email: String!, $username: String!, $password: String!) {
    addNewUser(email: $email, username: $username, password: $password) {
      username
      email
    }
  }
`;
export default USER_QUERY;
