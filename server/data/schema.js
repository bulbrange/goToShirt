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
    phone: String!
    groups: [Group!]
    tshirts: [Tshirt!]
  }
  type Group {
    id: Int!
    name: String!
    image: String!
    users: [User!]!
    messages: [MessageGroup!]!
    tshirts(first: Int, after: String): TshirtConnection # messages sent to the group
  }
  type Tshirt {
    id: Int!
    userId: Int!
    name: String!
    source: String!
    sourceBack: String!
    color: String!
    texture: [TshirtTextures]!
    updatedAt: Date!
  }
  input ConnectionInput {
    first: Int
    after: String
  }
  type TshirtEdge {
    cursor: Date!
    node: Tshirt!
  }
  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }
  type TshirtConnection {
    edges: [TshirtEdge]
    pageInfo: PageInfo!
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
    userByEmail(email: String!): User
    user(email: String!, password: String!): User
    userById(id: Int!): User
    users: [User]
    group(id: Int!): Group
    # userGroups(userId: Int!): [Group]
    groups(userId: Int!): [Group]
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
    updateShirtColor(tshirtId: Int!, color: String!): Tshirt
    removeShirt(tshirtId: Int!): Tshirt
  }
  schema {
    query: Query
    mutation: Mutation
  }
`;
// QUERY ---> tshirtsByGroup(groupId: Int!): [Tshirt]
export default typeDefs;
