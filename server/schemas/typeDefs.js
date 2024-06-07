export const typeDefs = `#graphql

type User {
  _id: ID!
  email: String!
  username: String!
  stacks: [Stack]
  snakeScores: [SnakeScore]
}

type Studycard {
  _id: ID!
  front: String!
  back: String!
}

type Stack {
  _id: ID!
  title: String!
  category: String!
  description: String
  date_created: String
  author: ID
  studycards: [Studycard]
}

type Auth {
  token: ID!
  user: User!
}

type SnakeScore {
  _id: ID!
  userId: ID!
  highSnakeScore: Int!
}

type Query {
  stacks: [Stack]
  studycard(id: ID!): [Studycard]
  studycardsByContent(question: String!, answer: String!): [Studycard]
  studycards: [Studycard]
  currentUser: User
  getHighSnakeScore(userId: ID!): SnakeScore
}

input CreateStudycardInput {
  front: String!
  back: String!
}

input CreateStackInput{
  title: String!
  category: String!
  description: String
  author: ID!
}

type Mutation {
  addUser(username: String!, email: String!, password: String!): Auth!
  login(username: String!, password: String!): Auth!
  createStudycard(input: CreateStudycardInput!): Studycard!
  createStack(input: CreateStackInput!): Stack!
  updateStudycard(studycardId: ID!, question: String!, answer: String!, noteSideA: String, noteSideB: String): Studycard!
  updateUser(username: String, email: String, password: String): User!
  updateStack(title: String!, category: String!, description: String): Stack!
  updateUserIsNewField(userId: ID!, isNewUser: Boolean!): User!
  updateHighSnakeScore(userId: ID!, newSnakeScore: Int!): SnakeScore
}

`;