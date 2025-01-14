export const typeDefs = `#graphql
    type User {
        id: ID!
        email: String!
        username: String!
        createdAt: String!
        studyCardGroups: [StudyCards]
        snakeScores: [HighScoreSnake]
    }

    type StudyCard {
        id: ID!
        front: String!
        back: String!
    }

    type StudyCards {
        id: ID!
        title: String!
        category: String!
        description: String
        date_created: String
        author: ID!
        studycards: [Studycard]
        tags: [string] #allows user to search for keywords
    }
    
    type HighScoreSnake {
        id: ID! 
        username: String!
        highScore: Int! 
    }
    
    type Auth {
        token: String!
        user: User!
    }

    type Query {
        getHighScoreSnake(userId: ID!): HighScoreSnake
    }
    
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        updateHighScoreSnake(username: ID!, newHighScoreSnake: Int!): HighScoreSnake!
    }
    
    input RegisiterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
`