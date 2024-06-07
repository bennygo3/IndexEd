import { gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
    query GetCurrentUser {
        currentUser {
            _id
            username
            email
            stacks {
                _id
                title
                category
                description
                date_created
                studycards {
                    _id
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
            highSnakeScore
        }
    }
`;


