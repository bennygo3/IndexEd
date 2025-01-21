import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
    mutation register($registerInput: RegisterInput!) {
        register(registerInput: $registerInput) {
            token
            user {
                id
                username
            }
        }
    }
`;

export const UPDATE_IS_NEW_USER = gql`
    mutation updateUserIsNewField($userId: ID!, $isNewUser: Boolean!){
        updateUserIsNewField(userId: $userId, isNewUser: $isNewUser) {
            id
            isNewUser
        }
    }
`;

export const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login (username: $username, password: $password) {
            token
            user {
                id
                username
            }
        }
    }
`;

export const CREATE_STUDYCARD = gql`
    mutation createStudycard($front: String!, $back: String!, $groupId: ID!) {
        createStudycard(front: $front, back: $back, groupId: $groupId) {
            id
            front
            back      
        }
    }
`;
export const CREATE_STUDYCARD_GROUP = gql`
    mutation createStudyCardGroup($title: String!, $category: String!, $description: String) {
        createStudyCardGroup(title: $title, category: $category, description: $description) {
            id
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
            id
            front
            back
        }
    }
`;

export const UPDATE_HIGH_SNAKE_SCORE = gql`
    mutation updateHighScoreSnake($username: ID!, $newHighScoreSnake: Int!) {
        updateHighScoreSnake(username: $username, newHighScoreSnake: $newHighScoreSnake) {
            username
            highScore
        }
    }
`;