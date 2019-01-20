import { graphql, compose } from 'react-apollo';

import { TSHIRTS } from '../../../queries/tshirt.queries';
import { withLoading } from '../../../components/withLoading';
import Dashboard from '../components/Dashboard';
import USER_BY_ID from '../../../queries/userById.query';

const pepetter = graphql(TSHIRTS, {
  options: () => ({ variables: { userId: 21 } }), // fake for now
  props: ({ data: { loading, tshirts } }) => ({
    loading,
    tshirts,
  }),
});
const userByIdQuery = graphql(USER_BY_ID, {
  options: () => ({ variables: { id: 22 } }), // fake for now
  props: ({ data: { loading, userById } }) => ({
    loading,
    userById,
  }),
});

export default compose(
  pepetter,
  userByIdQuery,
  withLoading,
)(Dashboard);
