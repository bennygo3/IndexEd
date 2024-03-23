import { gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
    query GetCurrentUser {
        currentUser {
            id
            username
            email
            stacks {
                id
                title
                category
                description
                flashcards {
                    id
                    question
                    answer
                }
            }
        }
    }
`;

//user flashcards which is dependent on the deck they have
export const HOME_DECKS = gql`
query decks{
    decks{
      _id
      title
      category
      description
      flashcards {
        _id
      }
    }
}
`
export const USER_DECKS = gql`
query userDecks{
    decks{
        _id
        title
        category
        description
        author
    }
}`


export const FLASHCARDS = gql`
query flashcards{
    flashcards{
        _id
        sideA
        sideB
        noteSideA
        noteSideB
    }
}`

export const FLASHCARD = gql`
query getFullDeck($deck: ID!){
    flashcard(deck: $deck){
        _id
        sideA
        sideB
        noteSideA
        noteSideB
        deck
    }
}`

export const STUDY_DECK = gql`
query getSingleDeck($deckId: ID!){
    deck(deckId: $deckId){
        _id
        title
        category
        description
        author
        flashcards {
            _id
        }
    }
}`

export const DECK_ID = gql`
query getSingleDeck($deckTitle: String){
    deckTitle(deckTitle: $deckTitle){
        _id
        title
    }
}`

export const UPDATE_IS_NEW_USER = gql`
    mutation updateUserIsNewField($userId: ID!, $isNewUser: Boolean!){
        updateUserIsNewField(userId: $userId, isNewUser: $isNewUser) {
            _id
            isNewUser
        }
    }
`;


