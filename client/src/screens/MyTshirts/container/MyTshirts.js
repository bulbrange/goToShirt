import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';

import { TSHIRTS } from '../../../queries/tshirt.queries';
import REMOVE_SHIRT from '../../../queries/remove-shirt.mutation';
import USER_BY_ID from '../../../queries/userById.query';
import { withLoading } from '../../../components/withLoading';
import Mytshirts from '../components/Mytshirts';

const tshirtsQuery = graphql(TSHIRTS, {
  options: ownProps => ({ variables: { userId: ownProps.auth.id } }), // fake for now
  props: ({ data: { loading, tshirts } }) => ({
    loading,
    tshirts,
  }),
});

const userByIdQuery = graphql(USER_BY_ID, {
  options: ownProps => ({ variables: { id: ownProps.auth.id } }), // fake for now
  props: ({ data: { loading, userById } }) => ({
    loading,
    userById,
  }),
});

const removeShirtMutation = graphql(REMOVE_SHIRT, {
  props: ({ mutate }) => ({
    removeShirt: tshirtId => mutate({
      variables: { tshirtId },
      refetchQueries: ['tshirts'],
    }),
  }),
});
const mapStateToProps = ({ auth }) => ({
  auth,
});
export default compose(
  connect(mapStateToProps),
  tshirtsQuery,
  removeShirtMutation,
  userByIdQuery,
  withLoading,
)(Mytshirts);
