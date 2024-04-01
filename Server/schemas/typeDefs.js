export const typeDefs = `#graphql

type User {
  _id: ID!
  email: String!
  username: String!
  stacks: [Stack]
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

type Query {
  stacks: [Stack]
  studycard(id: ID!): [Studycard]
  studycardsByContent(question: String!, answer: String!): [Studycard]
  studycards: [Studycard]
  currentUser: User
}

input CreateStudycardInput {
  front: String!
  back: String!
}

input CreateStackInput{
  title: String!
  category: String!
  description: String
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
}

`;


// type Deck {
//   id: ID
//   title: String!
//   category: String!
//   description: String
//   date_created: String
//   author: ID
//   flashcards: [Flashcard]
// }
// from Query { flashcardById(_id: ID: [Flashcard] } 
// changed flashcard to retrieve a single Flashcard 