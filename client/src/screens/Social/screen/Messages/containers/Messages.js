import { graphql, compose } from 'react-apollo';
import R from 'ramda';
import { Buffer } from 'buffer';
import { connect } from 'react-redux';
import Messages from '../components/Messages';
import MESSAGE_QUERY_PAGINATION from '../../../../../queries/message.query';
import GROUP_QUERY from '../../../../../queries/group.query';
import CREATE_MESSAGE from '../../../../../queries/create-message.mutation';
import { withLoading } from '../../../../../components/withLoading';
import USER_BY_ID from '../../../../../queries/userById.query';

const ITEMS_PER_PAGE = 10;

const messageQuery = graphql(MESSAGE_QUERY_PAGINATION, {
  options: ownProps => ({
    variables: {
      groupId: ownProps.navigation.state.params.groupId,
      connectionInput: { first: ITEMS_PER_PAGE },
    },
  }), // fake for now I-MEN
  props: ({
    data: {
      loading, message, fetchMore, subscribeToMore, refetch,
    },
  }) => ({
    loading,
    message,
    refetch,
    subscribeToMore,
    loadMoreEntries() {
      return fetchMore({
        // query: ... (you can specify a different query.
        // GROUP_QUERY is used by default)
        variables: {
          groupId: message.edges[0].node.to.id,
          connectionInput: {
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

const groupQuery = graphql(GROUP_QUERY, {
  options: ownProps => ({ variables: { id: ownProps.navigation.state.params.groupId } }), // fake for now I-MEN
  props: ({ data: { loading, group } }) => ({
    loading,
    group,
  }),
});

const createMessage = graphql(CREATE_MESSAGE, {
  props: ({ mutate, ownProps }) => ({
    createMessage: (message) => {
      return mutate({
        variables: message,
        refetchQueries: ['group', 'message', 'userById'],
      });
    },
  }),
});

const mapStateToProps = ({ auth }) => ({
  auth,
});
export default compose(
  connect(mapStateToProps),
  messageQuery,
  groupQuery,
  createMessage,
  withLoading,
)(Messages);
