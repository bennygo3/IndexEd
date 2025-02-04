import { gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
    query GetCurrentUser {
        getCurrentUser {
            _id
            email
            username
            createdAt
            studyCardGroup {
                _id
                title
                category
                description
                createdAt
                updatedAt
                studycard {
                    _id
                    front
                    back
                }
            }
            snakeScores {
                _id
                userId
                username
                highScore
            }
        }
    }
`;

export const STUDYCARD = gql`
query studycard{
    studycard{
        _id
        front
        back
    }
}`;

export const GET_HIGH_SNAKE_SCORE = gql`
    query GetHighSnakeScore($userId: ID!) {
        getHighSnakeScore(userId: $userId) {
            _id
            userId
            username
            highScore
        }
    }
`;