import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
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
// id removed
const userByIdQuery = graphql(USER_BY_ID, {
  props: ({ data: { loading, userById } }) => ({
    loading,
    userById,
  }),
});
const mapStateToProps = ({ auth }) => ({
  auth,
});
export default compose(
  connect(mapStateToProps),
  userByIdQuery,
  // userGroups,
  withLoading,
)(Groups);
