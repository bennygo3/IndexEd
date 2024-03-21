export const typeDefs = `#graphql

type User {
  id: ID!
  email: String!
  username: String!
  stacks: [Deck]
}

type Studycard {
  id: ID!
  question: String!
  answer: String!
  stackId: ID!
}

type Auth {
  token: ID
  user: User
}

type Query {
  decks: [Deck]
  flashcard(id: ID!): Flashcard
  flashCardsByContent(sideA: String!, sideB: String!): [Flashcard]
  flashcards: [Flashcard]
  currentUser: User
}

type Mutation {
  addUser(username: String!, email: String!, password: String!): Auth!
  createCard(question: String!, answer: String!, stackId: ID!): StudyCard!

  updateFlashCard(flashcardId: ID!, sideA: String!, sideB: String!, noteSideA: String, noteSideB: String): Flashcard!
  updateUser(username: String, email: String, password: String): User!
  updateDeck(title: String!, category: String!, description: String): Deck!
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