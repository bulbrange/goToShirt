import gql from 'graphql-tag';

const NEW_GROUP = gql`
  mutation newGroup($group: CreateGroupInput!) {
    newGroup(group: $group) {
      id
      name
      users {
        id
        username
      }
    }
  }
`;

export default NEW_GROUP;
