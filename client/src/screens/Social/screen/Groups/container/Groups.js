import { graphql, compose } from 'react-apollo';

import { GET_USERS } from '../../../../../queries/user.queries';
import { withLoading } from '../../../../../components/withLoading';
import Groups from '../components/Groups';
import USER_BY_ID from '../../../../../queries/userById.query';
import USER_GROUPS from '../../../../../queries/groups.query';

// const userGroups = graphql(USER_GROUPS, {
//   options: () => ({ variables: { id: 22 } }), // fake for now
//   props: ({ data: { loading, groups } }) => ({
//     loading,
//     groups,
//   }),
// });

const userByIdQuery = graphql(USER_BY_ID, {
  options: () => ({ variables: { id: 22 } }), // fake for now
  props: ({ data: { loading, userById } }) => ({
    loading,
    userById,
  }),
});

export default compose(
  userByIdQuery,
  // userGroups,
  withLoading,
)(Groups);
