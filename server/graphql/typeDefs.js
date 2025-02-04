export const typeDefs = `#graphql
    type User {
        _id: ID!
        email: String!
        username: String!
        createdAt: String!
        studyCardGroup: [StudyCardGroup]
        snakeScores: [SnakeScore]
    }

    type StudyCard {
        _id: ID!
        front: String!
        back: String!
        studyCardGroupId: ID!
    }

    type StudyCardGroup {
        _id: ID!
        title: String!
        category: String!
        description: String
        author: ID
        studyCard: [StudyCard]
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
        getStudyCardGroups(userId: ID): [StudyCardGroup] 
        getStudyCardGroup(groupId: ID!): StudyCardGroup
        studycard(id: ID!): StudyCard
    }
    
    type Mutation {
        register(username: String!, email: String!, password: String!, confirmPassword: String!): Auth!
        login(username: String!, password: String!): Auth!
        updateHighScoreSnake(username: ID!, newHighScoreSnake: Int!): SnakeScore!
        createStudyCardGroup(title: String!, category: String!, description: String): StudyCards!
        deleteStudyCardGroup(groupId: ID!): Boolean!
        updateStudyCardGroup(groupId: ID!, title: String, category: String, description: String): StudyCards!
        createStudyCard(front: String!, back: String!, studyCardGroupId: ID!): StudyCard!
        deleteStudyCard(cardId: ID!): Boolean!
        updateStudyCard(cardId: ID!, front: String, back: String): StudyCard!
    }

`;