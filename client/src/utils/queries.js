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
                studycards {
                    _id
                    front
                    back
                }
            }
        }
    }
`;

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
    }
}`;


