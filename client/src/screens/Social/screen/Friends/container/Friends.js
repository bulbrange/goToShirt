import { graphql, compose } from 'react-apollo';

import { GET_USERS } from '../../../../../queries/user.queries';
import { withLoading } from '../../../../../components/withLoading';
import Friends from '../components/Friends';

const usersQuery = graphql(GET_USERS, {
  props: ({ data: { users } }) => ({
    users,
  }),
});

export default compose(
  usersQuery,
  withLoading,
)(Friends);
