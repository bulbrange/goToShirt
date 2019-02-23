import { graphql, compose } from 'react-apollo';
import ConfigUserView from '../components/ConfigUserView';
import USER_BY_ID from '../../../queries/userById.query';
import { withLoading } from '../../../components/withLoading';


const userByIdQuery = graphql(USER_BY_ID, {
  options: () => ({ variables: { id: 24 } }), // fake for now
  props: ({ data: { loading, userById } }) => ({
    loading,
    userById,
  }),
});

export default compose(
  withLoading,
  userByIdQuery,
)(ConfigUserView);

