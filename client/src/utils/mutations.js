import { gql } from "@apollo/client";

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const UPDATE_IS_NEW_USER = gql`
    mutation updateUserIsNewField($userId: ID!, $isNewUser: Boolean!){
        updateUserIsNewField(userId: $userId, isNewUser: $isNewUser) {
            _id
            isNewUser
        }
    }
`

export const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login (username: $username, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const CREATE_STUDYCARD = gql`
    mutation createStudycard($input: CreateStudycardInput!) {
        createStudycard(input: $input) {
            _id
            front
            back      
        }
    }`
export const CREATE_STACK = gql`
    mutation createStack($input: CreateStackInput!) {
        createStack(input: $input) {
            _id
            title
            categeory
            description
            author {
                _id
                username
            }
        }
    }
`;