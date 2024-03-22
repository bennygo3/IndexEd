export const typeDefs = `#graphql

type User {
  id: ID!
  email: String!
  username: String!
  stacks: [Stack]
}

type Studycard {
  id: ID!
  question: String!
  answer: String!
  stackId: ID!
}

type Stack {
  id: ID!
  title: String!
  category: String!
  description: String
  date_created: String
  author: ID
  studycards: [Studycard]
}

type Auth {
  token: ID
  user: User
}

type Query {
  stacks: [Stack]
  studycard(id: ID!): [Studycard]
  studycardsByContent(question: String!, answer: String!): [Studycard]
  studycards: [Studycard]
  currentUser: User
}

type Mutation {
  addUser(username: String!, email: String!, password: String!): Auth!
  createCard(question: String!, answer: String!, stackId: ID!): StudyCard!

  updateStudycard(studycardId: ID!, question: String!, answer: String!, noteSideA: String, noteSideB: String): Studycard!
  updateUser(username: String, email: String, password: String): User!
  updateStack(title: String!, category: String!, description: String): Stack!
  login(username: String!, password: String!): Auth!
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