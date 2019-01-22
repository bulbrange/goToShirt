import { graphql, compose } from 'react-apollo';
import Messages from '../components/Messages';
// import MESSAGE_QUERY from '../../../../../queries/message.query';
import MESSAGE_PAGINATION from '../../../../../queries/message.query';
import { withLoading } from '../../../../../components/withLoading';

const messageQuery = graphql(MESSAGE_PAGINATION, {
  options: () => ({ variables: { groupId: 1, connectionInput: { first: 10, after: 'NDk=' } } }), // fake for now I-MEN
  props: ({ data: { loading, message } }) => ({
    loading,
    message,
  }),
});

export default compose(
  messageQuery,
  withLoading,
)(Messages);
