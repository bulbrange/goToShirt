import gql from 'graphql-tag';

const SHARE = gql`
  mutation share($tshirtId: Int!, $groupId: Int!) {
    share(tshirtId: $tshirtId, groupId: $groupId) {
      userId
    }
  }
`;

export default SHARE;
