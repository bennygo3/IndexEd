export const typeDefs = `#graphql
    type User {
        id: ID!
        email: String!
        username: String!
        createdAt: String!
        studyCardGroups: [StudyCards]
        snakeScores: [HighScoreSnake]
    }

    type Category {
        id: ID!
        name: String!
        description: String
    }

    type StudyCard {
        id: ID!
        front: String!
        back: String!
        defaultGroup: StudyCards
    }

    type StudyCards {
        id: ID!
        title: String!
        category: String!
        description: String
        author: ID!
        studycards: [StudyCard]
        createdAt: String
        updatedAt: String
        tags: [String] #allows user to search for keywords
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