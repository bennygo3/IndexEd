import { gql } from "@apollo/client";

export const UPDATE_IS_NEW_USER = gql`
    mutation updateUserIsNewField($userId: ID!, $isNewUser: Boolean!){
        updateUserIsNewField(userId: $userId, isNewUser: $isNewUser) {
            _id
            isNewUser
        }
    }
`;
export const CREATE_STUDYCARD = gql`
    mutation createStudyCard($front: String!, $back: String!, $studyGenreId: ID) {
        createStudyCard(front: $front, back: $back, studyGenreId: $studyGenreId) {
            _id
            front
            back  
            studyGenreId    
        }
    }
`;

export const CREATE_STUDY_GENRE = gql`
    mutation CreateStudyGenre($title: String!, $category: String!, $description: String) {
        createStudyGenre(title: $title, category: $category, description: $description) {
            _id
            title
            category
            description
            createdAt
            updatedAt
        }
    }
`;

export const UPDATE_STUDYCARD = gql `
    mutation updateStudyCard($cardId: ID!, $front: String, $back: String, $studyGenreId: ID) {
        updateStudyCard(cardId: $cardId, front: $front, back: $back, studyGenreId: $studyGenreId) {
            _id
            front
            back
            studyGenreId
        }
    }
`;

export const MOVE_STUDY_CARDS_TO_GENRE = gql `
    mutation MoveStudyCardsToGenre(
        $studyCardIds: [ID!]!
        $studyGenreId: ID!
    ) {
        moveStudyCardsToGenre(
            studyCardIds: $studyCardIds
            studyGenreId: $studyGenreId
        ) {
            _id
            title
            category
            description
            studyCards {
                _id
                front
                back
                studyGenreId
            }  
        }
    }
`;

export const UPDATE_HIGH_SNAKE_SCORE = gql`
    mutation UpdateHighScoreSnake($newSnakeScore: Int!) {
        updateHighSnakeScore(newSnakeScore: $newSnakeScore) {
            changed 
            highScore
        }
    }
`;
