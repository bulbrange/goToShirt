import { graphql, compose } from 'react-apollo';
import R from 'ramda';
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
  options: () => ({ variables: { first: 10 } }), // fake for now
  props: ({ data: { loading, userById, fetchMore, subscribeToMore, refetch } }) => ({
    loading,
    userById,
    subscribeToMore,
    refetch,
    loadMoreEntries(groupId) {
      const currentGroup = userById.groups.filter(group => group.id === groupId)[0];
      const groupIndex = userById.groups.reduce((c, n, i) => {
        if (n.id === groupId) c = i;
        return c;
      }, -1);

      return fetchMore({
        // query: ... (you can specify a different query.
        // GROUP_QUERY is used by default)
        variables: {
          first: 10,
          after: currentGroup.tshirts.edges[currentGroup.tshirts.edges.length - 1].cursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          // we will make an extra call to check if no more entries
          if (!fetchMoreResult) {
            return previousResult;
          }

          const edgesLens = R.lensPath(['userById', 'groups', groupIndex, 'tshirts', 'edges']);
          const pageInfoLens = R.lensPath([
            'userById',
            'groups',
            groupIndex,
            'tshirts',
            'pageInfo',
          ]);

          const moreEdges = R.view(edgesLens, fetchMoreResult);

          // push results (older messages) to end of messages list
          return R.compose(
            R.set(pageInfoLens, R.view(pageInfoLens, fetchMoreResult)),
            R.over(edgesLens, xs => R.concat(xs, moreEdges)),
          )(previousResult);
        },
      });
    },
  }),
});

const removeShirtMutation = graphql(REMOVE_SHIRT, {
  props: ({ mutate }) => ({
    removeShirt: tshirtId => mutate({
      variables: { tshirtId },
      refetchQueries: ['userById'],
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
