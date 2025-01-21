import { gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
    query GetCurrentUser {
        getCurrentUser {
            id
            username
            email
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
            
        }
    }
`;

export const STUDYCARDS = gql`
query studycards{
    studycards{
        _id
        front
        back
    }
}`;

export const GET_HIGH_SNAKE_SCORE = gql`
    query GetHighSnakeScore($userId: ID!) {
        getHighSnakeScore(userId: $userId) {
            userId
            highScore
        }
    }
`;