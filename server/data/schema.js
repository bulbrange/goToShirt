const { gql } = require('apollo-server');

export const typeDefs = gql`
  # declare custom scalars
  scalar Date
  # a user -- keep type really simple for now
  type User {
    id: Int! # unique id for the user
    email: String! # we will also require a unique email per user
    username: String! # this is the name we'll show other users
  }

  # query for types
  type Query {
    # Return a user by their email or id
    user(email: String!): User
    users: [User]
  }
  type Mutation {
    addNewUser(email: String!, username: String!, password: String!): User
    updateUserEmail(id: Int!, email: String!): User
    delUser(id: Int!): User
  }
  schema {
    query: Query
    mutation: Mutation
  }
`;

export default typeDefs;
