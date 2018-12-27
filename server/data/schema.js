const { gql } = require('apollo-server');

export const typeDefs = gql`
  # declare custom scalars
  scalar Date
  # a user -- keep type really simple for now
  input CreateTextureInput {
    source: String!
    posX: Int!
    posY: Int!
    renderSize: Int!
    backgroundColor: String!
    tintColor: String
    face: String!
    tshirtId: Int!
    rotate: String!
    text: String!
  }
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
  }

  type MessageGroup {
    id: Int!
    userId: Int!
    groupId: Int!
    text: String!
  }

  type TshirtTextures {
    id: Int!
    source: String!
    posX: Int!
    posY: Int!
    renderSize: Int!
    backgroundColor: String!
    tintColor: String
    face: String!
    tshirtId: Int!
    rotate: String!
    text: String!
  }
  # query for types
  type Query {
    # Return a user by their email or id
    userByEmail(email: String!): User
    user(email: String!, password: String!): User
    users: [User]
    group(id: Int!): Group
    groups: [Group]
    tshirt(id: Int!): Tshirt
    tshirts(userId: Int!): [Tshirt]
    messages(userId: Int!, groupId: Int!): MessageGroup
    tshirtTextures(id: Int!): TshirtTextures
    textures(tshirtId: Int!): [TshirtTextures]
  }
  type Mutation {
    addNewUser(email: String!, username: String!, password: String!): User
    updateUserEmail(id: Int!, email: String!): User
    delUser(id: Int!): User
    addNewShirt(userId: Int!, name: String!, color: String!): Tshirt
    addTexture(texture: CreateTextureInput!): TshirtTextures
    cleanShirtTextures(tshirtId: Int!): Tshirt
    updateShirtName(tshirtId: Int!, name: String!): Tshirt
  }
  schema {
    query: Query
    mutation: Mutation
  }
`;

export default typeDefs;
