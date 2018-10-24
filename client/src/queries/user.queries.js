import gql from 'graphql-tag';
// get the user and all user's groups
const USER_QUERY = gql`
  mutation {
  addNewUser(email: String!, username: String!, password: String!){
    username
    email
    
  }
}
`;
export default USER_QUERY;
