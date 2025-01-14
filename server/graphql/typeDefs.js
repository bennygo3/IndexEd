export const typeDefs = `#graphql
    type User {
        id: ID!
        email: String!
        username: String!
        createdAt: String!
        snakeScores: [HighScoreSnake]
    }
    
    type HighScoreSnake {
        id: ID! 
        username: String!
        highScore: Int! 
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