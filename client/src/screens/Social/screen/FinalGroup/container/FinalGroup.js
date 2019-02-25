import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import NEW_GROUP from '../../../../../queries/new-group.mutation';
import { GET_USERS } from '../../../../../queries/user.queries';
import { withLoading } from '../../../../../components/withLoading';
import FinalGroup from '../components/FinalGroup';
import CREATE_MESSAGE from '../../../../../queries/create-message.mutation';

const usersQuery = graphql(GET_USERS, {
  props: ({ data: { users } }) => ({
    users,
  }),
});

const createMessage = graphql(CREATE_MESSAGE, {
  props: ({ mutate }) => ({
    createMessage: message => mutate({
      variables: message,
      refetchQueries: ['group', 'message'],
    }),
  }),
});
const newGroup = graphql(NEW_GROUP, {
  props: ({ mutate }) => ({
    newGroup: group => mutate({
      variables: { group },
      refetchQueries: ['userById'],
    }),
  }),
});
const mapStateToProps = ({ auth }) => ({
  auth,
});
export default compose(
  connect(mapStateToProps),
  createMessage,
  usersQuery,
  withLoading,
  newGroup,
)(FinalGroup);
