import { graphql, compose } from 'react-apollo';

import { GET_USERS } from '../../../../../queries/user.queries';
import { withLoading } from '../../../../../components/withLoading';
import FinalGroup from '../components/FinalGroup';

const usersQuery = graphql(GET_USERS, {
  props: ({ data: { users } }) => ({
    users,
  }),
});

export default compose(
  usersQuery,
  withLoading,
)(FinalGroup);
