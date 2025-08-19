export const typeDefs = `#graphql
    type User {
        _id: ID!
        email: String!
        username: String!
        studyGenres: [StudyGenre]
        studyCards: [StudyCard]
        snakeScores: [SnakeScore]
        createdAt: String!
        updatedAt: String
    }

    type StudyCard {
        _id: ID!
        front: String!
        back: String!
    }

    type StudyGenre {
        _id: ID!
        title: String!
        category: String!
        description: String
        author: ID
        studyCards: [StudyCard]
        createdAt: String
        updatedAt: String
        tags: [String] 
    }

    type Auth {
        accessToken: String!
        user: User!
    }
    
    type SnakeScore {
        _id: ID!
        userId: ID!
        username: String!
        highScore: Int!
    }

    type UpdatedHighSnakeScore {
        changed: Boolean!
        highScore: Int
    }

    type Query {
        getCurrentUser: User
        getHighScoreSnake: SnakeScore
        getStudyGenres(userId: ID): [StudyGenre] 
        getStudyGenre(studyGenreId: ID!): StudyGenre
        getStudyCard(id: ID!): StudyCard
    }
    
    type Mutation {
        register(username: String!, email: String!, password: String!, confirmPassword: String!): Auth!
        login(username: String!, password: String!): Auth!
        refreshToken: Auth!
        logout: Boolean!

        updateHighSnakeScore(newSnakeScore: Int!): UpdatedHighSnakeScore!
        
        createStudyGenre(title: String!, category: String!, description: String): StudyGenre!
        deleteStudyGenre(genreId: ID!): Boolean!
        updateStudyGenre(genreId: ID!, title: String, category: String, description: String): StudyGenre!
        
        createStudyCard(front: String!, back: String!): StudyCard!
        deleteStudyCard(cardId: ID!): Boolean!
        updateStudyCard(cardId: ID!, front: String, back: String): StudyCard!
    }

`;

// getHighScoreSnake(userId: ID!): SnakeScore

// mutation: updateHighScoreSnake(username: ID!, newHighScoreSnake: Int!): SnakeScore!
