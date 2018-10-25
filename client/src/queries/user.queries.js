import gql from 'graphql-tag';
import Register from '../screens/Registrer';

// get the user and all user's groups
const NEW_USER = gql`
  mutation addNewUser($email: String!, $username: String!, $password: String!) {
    addNewUser(email: $email, username: $username, password: $password) {
      username
      email
    }
  }
`;
export default NEW_USER;
