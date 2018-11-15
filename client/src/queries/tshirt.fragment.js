import gql from 'graphql-tag';

const TSHIRT_FRAGMENT = gql`
  fragment TshirtFragment on TshirtTextures {
    id
    source
    posX
    posY
  }
`;

export default TSHIRT_FRAGMENT;
