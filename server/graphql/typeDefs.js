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
        tags: [String] 
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
        getCurrentUser: User
        getHighScoreSnake(userId: ID!): HighScoreSnake
        getStudyCardGroups: [StudyCards]
        getStudyCardGroup(groupId: ID!): StudyCards
    }
    
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        updateHighScoreSnake(username: ID!, newHighScoreSnake: Int!): HighScoreSnake!
        createStudyCardGroup(title: String!, category: String!, description: String): StudyCards!
        deleteStudyCardGroup(groupId: ID!): Boolean!
        updateStudyCardGroup(groupId: ID!, title: String, category: String, description: String): StudyCards!
        createStudyCard(front: String!, back: String!, groupId: ID!): StudyCard!
        deleteStudyCard(cardId: ID!): Boolean!
    }
    
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
`