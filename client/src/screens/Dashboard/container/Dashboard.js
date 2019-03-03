import { graphql, compose } from 'react-apollo';
import R from 'ramda';
import { Buffer } from 'buffer';
import { connect } from 'react-redux';
import { TSHIRTS } from '../../../queries/tshirt.queries';
import { withLoading } from '../../../components/withLoading';
import Dashboard from '../components/Dashboard';
import USER_BY_ID from '../../../queries/userById.query';
import MESSAGE_ADDED_SUBSCRIPTION from '../../../queries/message-added.subscription';

const pepetter = graphql(TSHIRTS, {
  options: ownProps => ({ variables: { userId: ownProps.auth.id } }),
  props: ({ data: { loading, tshirts } }) => ({
    loading,
    tshirts,
  }),
});
const userByIdQuery = graphql(USER_BY_ID, {
  options: ownProps => ({ variables: { first: 10 } }), // fake for now
  props: ({
    data: {
      loading, userById, fetchMore, subscribeToMore, refetch,
    },
  }) => ({
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
        variables: {
          first: 10,
          after: currentGroup.tshirts.edges[currentGroup.tshirts.edges.length - 1].cursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
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

          return R.compose(
            R.set(pageInfoLens, R.view(pageInfoLens, fetchMoreResult)),
            R.over(edgesLens, xs => R.concat(xs, moreEdges)),
          )(previousResult);
        },
      });
    },
    subscribeToMessages() {
      return subscribeToMore({
        document: MESSAGE_ADDED_SUBSCRIPTION,
        variables: {
          userId: userById.id,
          groupIds: userById.groups.map(group => group.id),
        },

        updateQuery: (previousResult, { subscriptionData }) => {
          if (!subscriptionData.data) return previousResult;
          const newMessage = subscriptionData.data.messageAdded;
          const edgesLens = R.lensPath(['message', 'edges']);
          refetch();
          return R.over(
            edgesLens,
            R.prepend({
              __typename: 'MessageEdge',
              node: newMessage,
              cursor: Buffer.from(newMessage.id.toString()).toString('base64'),
            }),
            previousResult,
          );
        },
      });
    },
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
