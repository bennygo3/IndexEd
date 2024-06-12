export const typeDefs = `#graphql
    type User {
        id: ID!
        email: String!
        username: String!
        token: String!
        createdAt: String!
        snakeScores: [SnakeScore]
    }
    input RegsiterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        updateHighSnakeScore(user: ID!, newSnakeHighScore: Int!): SnakeScore
    }
`