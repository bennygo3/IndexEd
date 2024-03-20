export const typeDefs = `#graphql

type Deck {
  _id: ID
  title: String!
  category: String!
  description: String
  date_created: String
  author: ID
  flashcards: [Flashcard]
}
  
type StudyCard {
  _id: ID!
  sideA: String!
  sideB: String!
  noteSideA: String
  noteSideB: String
  deckTitle: String
}

type User {
  _id: ID
  email: String!
  username: String!
  decks: [Deck]
}
  
type Auth {
  token: ID
  user: User
}

type Query {
  decks: [Deck]
  flashcard(_id: ID!): Flashcard
  flashCardsByContent(sideA: String!, sideB: String!): [Flashcard]
  flashcards: [Flashcard]
  currentUser: User
}

type Mutation {
  addUser(username: String!, email: String!, password: String!): Auth!
  addDeck(title: String!, category: String!, description: String): Deck!
  addFlashCard(sideA: String!, sideB: String!, deckId: ID!): Flashcard!
  updateFlashCard(flashcardId: ID!, sideA: String!, sideB: String!, noteSideA: String, noteSideB: String): Flashcard!
  updateUser(username: String, email: String, password: String): User!
  updateDeck(title: String!, category: String!, description: String): Deck!
  login(username: String!, password: String!): Auth!
  updateUserIsNewField(userId: ID!, isNewUser: Boolean!): User!
}

`;



// from Query { flashcardById(_id: ID: [Flashcard] } 
// changed flashcard to retrieve a single Flashcard 