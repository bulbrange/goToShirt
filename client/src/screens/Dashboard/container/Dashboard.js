import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { TSHIRTS } from '../../../queries/tshirt.queries';
import { withLoading } from '../../../components/withLoading';
import Dashboard from '../components/Dashboard';
import USER_BY_ID from '../../../queries/userById.query';

const pepetter = graphql(TSHIRTS, {
  options: ownProps => ({ variables: { userId: ownProps.auth.id } }),
  props: ({ data: { loading, tshirts } }) => ({
    loading,
    tshirts,
  }),
});
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
  pepetter,
  userByIdQuery,
  withLoading,
)(Dashboard);
