import { graphql, compose } from 'react-apollo';

import { TSHIRTS } from '../../../queries/tshirt.queries';
import withLoading from '../../../components/withLoading';
import Dashboard from '../componnents/Dashboard';

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
)(Dashboard);
