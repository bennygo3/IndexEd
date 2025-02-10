export const typeDefs = `#graphql
    type User {
        _id: ID!
        email: String!
        username: String!
        createdAt: String!
        studyGenres: [StudyGenre]
        snakeScores: [SnakeScore]
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
        getStudyGenres(userId: ID): [StudyGenre] 
        getStudyGenre(studyGenreId: ID!): StudyGenre
        getStudyCard(id: ID!): StudyCard
    }
    
    type Mutation {
        register(username: String!, email: String!, password: String!, confirmPassword: String!): Auth!
        login(username: String!, password: String!): Auth!
        updateHighScoreSnake(username: ID!, newHighScoreSnake: Int!): SnakeScore!
        
        createStudyGenre(title: String!, category: String!, description: String): StudyGenre!
        deleteStudyGenre(genreId: ID!): Boolean!
        updateStudyGenre(genreId: ID!, title: String, category: String, description: String): StudyGenre!
        
        createStudyCard(front: String!, back: String!): StudyCard!
        deleteStudyCard(cardId: ID!): Boolean!
        updateStudyCard(cardId: ID!, front: String, back: String): StudyCard!
    }

`;