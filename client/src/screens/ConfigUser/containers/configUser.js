import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import ConfigUserView from '../components/configUser';
import USER_BY_ID from '../../../queries/userById.query';
import { withLoading } from '../../../components/withLoading';

const userByIdQuery = graphql(USER_BY_ID, {
  options: ownProps => ({ variables: { id: ownProps.auth.id } }), // fake for now
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
  withLoading,
  userByIdQuery,
)(ConfigUserView);
