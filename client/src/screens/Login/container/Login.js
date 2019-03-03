import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import Login from '../components/Login';
import LOGIN_MUTATION from '../../../queries/login.mutation';
import { withLoading } from '../../../components/withLoading';

const loginMutation = graphql(LOGIN_MUTATION, {
  props: ({ mutate }) => ({
    login: (email, password) => mutate({
      variables: { email, password },
      // refetchQueries: ['tshirt', 'tshirts'],
    }),
  }),
});

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default compose(
  connect(mapStateToProps),
  loginMutation,
  withLoading,
)(Login);
