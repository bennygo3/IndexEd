import { gql } from "@apollo/client";

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

export const CREATE_STUDYCARD = gql`
    mutation createStudycard($front: String!, $back: String!, $stackId: ID!) {
        createStudycard(front: $front, back: $back, stackId: $stackId) {
            _id
            front
            back
            stack {
                _id
                title
            }
            creator {
                _id
                username
            }        
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

//  const ADD_DECK = 
//     mutation addDeck($title: String!, $category: String!, $description: String!, $author: String!) {
//         addDeck(title: $title, category: $category, description: $description, author: $author) {
//             _id
//             title
//             category
//             description
//             date_created
//             author
            
//         }
//     }