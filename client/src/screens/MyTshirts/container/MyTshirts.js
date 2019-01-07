import { graphql, compose } from 'react-apollo';

import { TSHIRTS } from '../../../queries/tshirt.queries';
import REMOVE_SHIRT from '../../../queries/remove-shirt.mutation';
import { withLoading } from '../../../components/withLoading';
import Mytshirts from '../components/Mytshirts';

const tshirtsQuery = graphql(TSHIRTS, {
  options: () => ({ variables: { userId: 1 } }), // fake for now
  props: ({ data: { loading, tshirts } }) => ({
    loading,
    tshirts,
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

export default compose(
  tshirtsQuery,
  removeShirtMutation,
  withLoading,
)(Mytshirts);
