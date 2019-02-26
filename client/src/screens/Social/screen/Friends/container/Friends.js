import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { GET_USERS } from '../../../../../queries/user.queries';
import { withLoading } from '../../../../../components/withLoading';
import Friends from '../components/Friends';

const usersQuery = graphql(GET_USERS, {
  props: ({ data: { users } }) => ({
    users,
  }),
});

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default compose(
  connect(mapStateToProps),
  usersQuery,
  withLoading,
)(Friends);
