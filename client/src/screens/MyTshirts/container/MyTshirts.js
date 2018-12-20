import { graphql, compose } from 'react-apollo';

import { TSHIRTS } from '../../../queries/tshirt.queries';

import Mytshirts from '../Mytshirts';


const tshirtsQuery = graphql(TSHIRTS, {
    //options: () => ({ variables: { id: 1 } }), // fake for now
    props: ({ data: { loading, tshirts } }) => ({
        loading,
        tshirts,
    }),
});

export default compose(tshirtsQuery)(Mytshirts);