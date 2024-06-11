export const typeDefs = `#graphql
    type User {
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }
    input RegsiterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: Sting!, password: String!): User!
    }
`