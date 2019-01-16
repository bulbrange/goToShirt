import gql from 'graphql-tag';

const ALL_GROUPS = gql`
  {
    groups {
      id
    }
  }
`;

export { ALL_GROUPS };
