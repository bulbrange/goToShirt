import gql from 'graphql-tag';


const TSHIRTS = gql`
  {
    tshirts {
      id
      name
    }
  } 
`;

export { TSHIRTS };
