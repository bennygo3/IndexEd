import { gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
    query GetCurrentUser {
        currentUser {
            id
            username
            email
            stacks {
                _id
                title
                category
                description
                studycards {
                    _id
                    front
                    back
                }
            }
        }
    }
`;

//user flashcards which is dependent on the deck they have
export const HOME_STACKS = gql`
query stacks{
    stackss{
      _id
      title
      category
      description
      studycards {
        _id
      }
    }
}
`
// export const USER_STUDYCARDS = gql`
// query userStacks{
//     stacks{
//         _id
//         title
//         category
//         description
//         author
//     }
// }`

export const GET_USER_STACKS = gql`
    query GetUserStacks {
        currentUser {
            _id
            stacks {
                _id
                title
                category
                description
                date_created
            }
        }
    }
`


export const STUDYCARDS = gql`
query studycards{
    studycards{
        _id
        front
        back
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


