import { gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
    query GetCurrentUser {
        getCurrentUser {
            _id
            email
            username
            createdAt
            studyGenres {
                _id
                title
                category
                description
                createdAt
                updatedAt
                studyCards {
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

export const GET_STUDY_GENRES = gql`
    query GetStudyGenres {
        getStudyGenres {
            _id
            title
            category
            description
            studyCards {
                _id
                front
                back
            }
        }
    }
`;

export const GET_STUDY_CARD = gql`
query GetStudyCard($id: ID!) {
    getStudyCard(id: $id){
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