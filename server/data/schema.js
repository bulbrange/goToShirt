const { gql } = require('apollo-server');
/*

*/
export const typeDefs = gql`
  # declare custom scalars
  scalar Date
  # a user -- keep type really simple for now
  input CreateMessageInput {
    userId: Int!
    groupId: Int!
    text: String!
  }

  input ConnectionInput {
    first: Int
    after: String
  }

  type MessageConnection {
    edges: [MessageEdge]
    pageInfo: PageInfo
  }

  type MessageEdge {
    cursor: String!
    node: MessageGroup!
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }

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
    jwt: String
  }
  type Group {
    id: Int!
    name: String!
    image: String!
    users: [User!]!
    messages: [MessageGroup!]!
    tshirts: [Tshirt]!
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

  type MessageGroup {
    id: Int!
    from: User!
    to: Group!
    text: String!
    createdAt: Date!
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
    groups(userId: Int!): [Group]
    tshirt(id: Int!): Tshirt
    tshirts(userId: Int!): [Tshirt]
    messages: [MessageGroup]
    message(groupId: Int, connectionInput: ConnectionInput): MessageConnection!
    tshirtTextures(id: Int!): TshirtTextures
    textures(tshirtId: Int!): [TshirtTextures]
  }
  type Mutation {
    createMessage(message: CreateMessageInput!): MessageGroup
    addNewUser(email: String!, username: String!, password: String!): User
    updateUserEmail(id: Int!, email: String!): User
    delUser(id: Int!): User
    addNewShirt(userId: Int!, name: String!, color: String!): Tshirt
    addTexture(texture: CreateTextureInput!): TshirtTextures
    cleanShirtTextures(tshirtId: Int!): Tshirt
    updateShirtName(tshirtId: Int!, name: String!): Tshirt
    updateShirtColor(tshirtId: Int!, color: String!): Tshirt
    removeShirt(tshirtId: Int!): Tshirt
    login(email: String!, password: String!): User!
  }
  schema {
    query: Query
    mutation: Mutation
  }
`;
// QUERY ---> tshirtsByGroup(groupId: Int!): [Tshirt]
export default typeDefs;
