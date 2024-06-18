export const typeDefs = `#graphql
    type User {
        id: ID!
        email: String!
        username: String!
        token: String!
        createdAt: String!
        snakeScore: [HighScoreSnake]
    }
    input RegsiterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    
    type HighScoreSnake {
        id: ID!
        username: String!
        highScoreSnake: Int!
    }

    type Query {
        getHighScoreSnake(userId: ID!):
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        updateHighScoreSnake(user: ID!, newHighScoreSnake: Int!): HighScoreSnake!
    }
`