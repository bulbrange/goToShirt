import gql from 'graphql-tag';

const GROUP_QUERY = gql`
  query group($id: Int!) {
    group(id: $id) {
      id
      name
      users {
        id
        username
      }
    }
  }
`;

export default GROUP_QUERY;
