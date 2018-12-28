import { graphql, compose } from 'react-apollo';

import { TSHIRTS } from '../../../queries/tshirt.queries';
import { withLoading } from '../../../components/withLoading';
import Mytshirts from '../components/Mytshirts';

const tshirtsQuery = graphql(TSHIRTS, {
  options: () => ({ variables: { userId: 1 } }), // fake for now
  props: ({ data: { loading, tshirts } }) => ({
    loading,
    tshirts,
  }),
});

export default compose(
  tshirtsQuery,
  withLoading,
)(Mytshirts);
