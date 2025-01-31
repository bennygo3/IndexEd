export const typeDefs = `#graphql
    type User {
        _id: ID!
        email: String!
        username: String!
        createdAt: String!
        studyCardGroups: [StudyCards]
        snakeScores: [SnakeScore]
    }

    type StudyCard {
        _id: ID!
        front: String!
        back: String!
    }

    type StudyCards {
        _id: ID!
        title: String!
        category: String!
        description: String
        author: ID
        studycards: [StudyCard]
        createdAt: String
        updatedAt: String
        tags: [String] 
    }
    
    type Auth {
        token: ID!
        user: User!
    }
    
    type SnakeScore {
        _id: ID
        userId: ID
        username: String
        highScore: Int
    }

    type Query {
        getCurrentUser: User
        getHighScoreSnake(userId: ID!): SnakeScore
        getStudyCardGroups: [StudyCards]
        getStudyCardGroup(groupId: ID!): StudyCards
        studycards: [StudyCard]
        studycard(id: ID!): StudyCard
    }
    
    type Mutation {
        register(username: String!, email: String!, password: String!, confirmPassword: String!): Auth!
        login(username: String!, password: String!): Auth!
        updateHighScoreSnake(username: ID!, newHighScoreSnake: Int!): SnakeScore!
        createStudyCardGroup(title: String!, category: String!, description: String): StudyCards!
        deleteStudyCardGroup(groupId: ID!): Boolean!
        updateStudyCardGroup(groupId: ID!, title: String, category: String, description: String): StudyCards!
        createStudyCard(front: String!, back: String!, groupId: ID!): StudyCard!
        deleteStudyCard(cardId: ID!): Boolean!
        updateStudyCard(cardId: ID!, front: String, back: String): StudyCard!
    }

`;