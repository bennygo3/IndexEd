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
    mutation createStudycard($front: String!, $back: String!, $groupId: ID!) {
        createStudycard(front: $front, back: $back, groupId: $groupId) {
            _id
            front
            back      
        }
    }
`;
export const CREATE_STUDYCARD_GROUP = gql`
    mutation createStudyCardGroup($title: String!, $category: String!, $description: String) {
        createStudyCardGroup(title: $title, category: $category, description: $description) {
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
    mutation updateStudyCard($cardId: ID!, $front: String, $back: String) {
        updateStudyCard(cardId: $cardId, front: $front, back: $back) {
            _id
            front
            back
        }
    }
`;

export const UPDATE_HIGH_SNAKE_SCORE = gql`
    mutation updateHighScoreSnake($username: String!, $newHighScoreSnake: Int!) {
        updateHighScoreSnake(username: $username, newHighScoreSnake: $newHighScoreSnake) {
            _id
            userId
            username
            highScore
        }
    }
`;