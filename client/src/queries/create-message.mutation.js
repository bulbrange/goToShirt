import gql from 'graphql-tag';

const CREATE_MESSAGE = gql`
  mutation createMessage($message: CreateMessageInput!) {
    createMessage(message: $message) {
      id
      from {
        id
        username
      }
      to {
        id
        name
      }
      createdAt
      text
    }
  }
`;

export default CREATE_MESSAGE;
