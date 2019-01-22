import { graphql, compose } from 'react-apollo';
import R from 'ramda';
import { Buffer } from 'buffer';
import Messages from '../components/Messages';
import MESSAGE_QUERY_PAGINATION from '../../../../../queries/message.query';
import { withLoading } from '../../../../../components/withLoading';

const ITEMS_PER_PAGE = 10;

const messageQuery = graphql(MESSAGE_QUERY_PAGINATION, {
  options: () => ({ variables: { groupId: 1, connectionInput: { first: ITEMS_PER_PAGE } } }), // fake for now I-MEN
  props: ({ data: { loading, message, fetchMore } }) => ({
    loading,
    message,
    loadMoreEntries() {
      return fetchMore({
        // query: ... (you can specify a different query.
        // GROUP_QUERY is used by default)
        variables: {
          messageConnection: {
            first: ITEMS_PER_PAGE,
            after: message.edges[message.edges.length - 1].cursor,
          },
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          // we will make an extra call to check if no more entries
          if (!fetchMoreResult) {
            return previousResult;
          }

          const edgesLens = R.lensPath(['message', 'edges']);
          const pageInfoLens = R.lensPath(['message', 'pageInfo']);

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

/* const groupQuery = graphql(GROUP_QUERY, {
  options: ownProps => ({
    variables: {
      groupId: ownProps.navigation.state.params.groupId,
      messageConnection: {
        first: ITEMS_PER_PAGE,
      },
    },
  }),
  props: ({
    data: {
      fetchMore,
      loading,
      group,
      subscribeToMore,
      refetch,
    },
  }) => ({
    loading,
    group,
    subscribeToMore,
    refetch,
    loadMoreEntries() {
      return fetchMore({
        // query: ... (you can specify a different query.
        // GROUP_QUERY is used by default)
        variables: {
          messageConnection: {
            first: ITEMS_PER_PAGE,
            after: group.messages.edges[group.messages.edges.length - 1].cursor,
          },
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          // we will make an extra call to check if no more entries
          if (!fetchMoreResult) {
            return previousResult;
          }

          const edgesLens = R.lensPath(['group', 'messages', 'edges']);
          const pageInfoLens = R.lensPath(['group', 'messages', 'pageInfo']);

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
}); */

export default compose(
  messageQuery,
  withLoading,
)(Messages);
