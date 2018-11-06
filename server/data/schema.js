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
  type Group {
    id: Int!
    name: String!
    image: String!
  }

  type Tshirt {
    id: Int!
    userId: Int!
    name: String!
    color: String!
    preview: String
    babylonURL: String
  }

  type MessageGroup {
    id: Int!
    userId: Int!
    groupId: Int!
    text: String!
  }

  type TshirtTextures {
    id: Int!
    tshirtId: Int!
    src: String!
    posX: Int!
    posY: Int!
    renderSize: Int!
    face: String!
  }
  # query for types
  type Query {
    # Return a user by their email or id
    userByEmail(email: String!): User
    user(email: String!, password: String!): User
    users: [User]
    group(id: Int!): Group
    groups: [Group]
    tshirts(id: Int!): Tshirt
    messages(userId: Int!, groupId: Int!): MessageGroup
    tshirtTextures(id: Int!): TshirtTextures
  }
  type Mutation {
    addNewUser(email: String!, username: String!, password: String!): User
    updateUserEmail(id: Int!, email: String!): User
    delUser(id: Int!): User
    addNewShirt(userId: Int!, name: String!, color: String!): Tshirt
    addTexture(
      src: String!
      posX: Int!
      posY: Int!
      renderSize: Int!
      face: String!
      tshirtId: Int!
    ): TshirtTextures
  }
  schema {
    query: Query
    mutation: Mutation
  }
`;

export default typeDefs;
