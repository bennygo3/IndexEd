import { gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
    query GetCurrentUser {
        getCurrentUser {
            id
            email
            username
            createdAt
            studyCardGroups {
                id
                title
                category
                description
                createdAt
                updatedAt
                studycards {
                    id
                    front
                    back
                }
            }
            snakeScores {
                id
                userId
                username
                highScore
            }
        }
    }
`;

export const STUDYCARDS = gql`
query studycards{
    studycards{
        id
        front
        back
    }
}`;

export const GET_HIGH_SNAKE_SCORE = gql`
    query GetHighSnakeScore($userId: ID!) {
        getHighSnakeScore(userId: $userId) {
            id
            userId
            username
            highScore
        }
    }
`;